<?php
/**
 * Recebe os formulários do site e envia por e-mail.
 * Depois do envio, redireciona para /obrigado.
 *
 * Configuração: copie config.example.php para config.php (no servidor, fora do Git)
 * e preencha os dados SMTP da conta de e-mail da Hostinger.
 */

declare(strict_types=1);

$config = [
    'destino'    => 'contato@otimizodigital.com.br',
    'smtp_host'  => 'smtp.hostinger.com',
    'smtp_porta' => 465,
    'smtp_user'  => '',
    'smtp_senha' => '',
    'remetente'  => '',
];
if (is_file(__DIR__ . '/config.php')) {
    $config = array_merge($config, require __DIR__ . '/config.php');
}

function voltar(string $destino): never {
    header('Location: ' . $destino, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    voltar('/');
}

$campo = static fn(string $k, int $max = 500): string =>
    trim(mb_substr(strip_tags((string)($_POST[$k] ?? '')), 0, $max));

// Anti-spam: campo oculto preenchido ou envio rápido demais (menos de 3 s)
$inicio = (int)($_POST['inicio'] ?? 0);
if ($campo('site_url') !== '' || ($inicio > 0 && (microtime(true) * 1000 - $inicio) < 3000)) {
    voltar('/obrigado/');
}

$tipo = $campo('tipo', 30) === 'candidatura' ? 'candidatura' : 'consultoria';
$nome = $campo('nome', 120);
$email = filter_var($campo('email', 160), FILTER_VALIDATE_EMAIL) ?: '';
$whatsapp = preg_replace('/[^\d()+\- ]/', '', $campo('whatsapp', 30));
$origem = $campo('origem', 200);

if ($tipo === 'consultoria') {
    $empresa = $campo('empresa', 160);
    if ($nome === '' || $email === '' || strlen(preg_replace('/\D/', '', $whatsapp)) < 10 || $empresa === '') {
        voltar(($origem ?: '/') . '?erro=campos#agendar');
    }
    $assunto = "Nova consultoria gratuita: {$nome} ({$empresa})";
    $linhas = [
        'Nome' => $nome,
        'WhatsApp' => $whatsapp,
        'E-mail' => $email,
        'Empresa' => $empresa,
        'Como podemos ajudar' => implode(', ', array_map(
            static fn($v) => mb_substr(strip_tags((string)$v), 0, 40),
            array_slice((array)($_POST['ajuda'] ?? []), 0, 12)
        )) ?: 'Não informado',
        'Objetivo para os próximos 12 meses' => $campo('objetivo', 2000) ?: 'Não informado',
        'Página de origem' => $origem,
    ];
} else {
    if ($nome === '' || $email === '') {
        voltar(($origem ?: '/trabalhe-conosco') . '?erro=campos');
    }
    $assunto = "Nova candidatura: {$nome}";
    $linhas = [
        'Nome' => $nome,
        'E-mail' => $email,
        'WhatsApp' => $whatsapp,
        'Área de interesse' => $campo('area', 80),
        'LinkedIn ou portfólio' => $campo('linkedin', 300),
        'Por que quer trabalhar na Otimizo' => $campo('motivo', 3000),
    ];
}

$corpo = '';
foreach ($linhas as $rotulo => $valor) {
    $corpo .= "{$rotulo}: {$valor}\n";
}
$corpo .= "\nEnviado em " . date('d/m/Y H:i') . ' pelo site otimizo.com.br';

// Anexo do currículo (apenas candidatura): PDF, DOC ou DOCX até 5 MB
$anexo = null;
if ($tipo === 'candidatura' && !empty($_FILES['curriculo']['tmp_name']) && is_uploaded_file($_FILES['curriculo']['tmp_name'])) {
    $ext = strtolower(pathinfo((string)$_FILES['curriculo']['name'], PATHINFO_EXTENSION));
    if (in_array($ext, ['pdf', 'doc', 'docx'], true) && $_FILES['curriculo']['size'] <= 5 * 1024 * 1024) {
        $anexo = ['nome' => 'curriculo-' . preg_replace('/[^a-z0-9]+/i', '-', $nome) . '.' . $ext,
                  'dados' => file_get_contents($_FILES['curriculo']['tmp_name'])];
    }
}

$enviado = enviar($config, $assunto, $corpo, $email, $nome, $anexo);
if (!$enviado) {
    error_log('[otimizo] falha ao enviar formulário: ' . $assunto);
}

$primeiroNome = explode(' ', $nome)[0] ?? '';
voltar('/obrigado/?' . http_build_query(['nome' => $primeiroNome, 'tipo' => $tipo]));

/**
 * Monta a mensagem MIME e envia por SMTP autenticado (se configurado) ou mail().
 */
function enviar(array $c, string $assunto, string $corpo, string $replyTo, string $replyNome, ?array $anexo): bool
{
    $remetente = $c['remetente'] ?: ($c['smtp_user'] ?: 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'otimizo.com.br'));
    $limite = 'otz' . bin2hex(random_bytes(8));
    $assuntoCod = '=?UTF-8?B?' . base64_encode($assunto) . '?=';
    $nomeCod = '=?UTF-8?B?' . base64_encode($replyNome) . '?=';

    $cab = [
        'MIME-Version: 1.0',
        "From: =?UTF-8?B?" . base64_encode('Site Otimizo') . "?= <{$remetente}>",
        "Reply-To: {$nomeCod} <{$replyTo}>",
        "Content-Type: multipart/mixed; boundary=\"{$limite}\"",
    ];
    $msg = "--{$limite}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
         . chunk_split(base64_encode($corpo)) . "\r\n";
    if ($anexo) {
        $msg .= "--{$limite}\r\nContent-Type: application/octet-stream; name=\"{$anexo['nome']}\"\r\n"
              . "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"{$anexo['nome']}\"\r\n\r\n"
              . chunk_split(base64_encode($anexo['dados'])) . "\r\n";
    }
    $msg .= "--{$limite}--\r\n";

    if ($c['smtp_user'] === '' || $c['smtp_senha'] === '') {
        return mail($c['destino'], $assuntoCod, $msg, implode("\r\n", $cab), '-f' . $remetente);
    }

    $s = @stream_socket_client("ssl://{$c['smtp_host']}:{$c['smtp_porta']}", $en, $es, 15);
    if (!$s) return false;
    $ler = static function () use ($s): string {
        $r = '';
        while (($l = fgets($s, 515)) !== false) { $r .= $l; if (($l[3] ?? '') === ' ') break; }
        return $r;
    };
    $cmd = static function (string $linha, string $esperado) use ($s, $ler): bool {
        fwrite($s, $linha . "\r\n");
        return str_starts_with($ler(), $esperado);
    };
    $ler();
    $ok = $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250')
       && $cmd('AUTH LOGIN', '334')
       && $cmd(base64_encode($c['smtp_user']), '334')
       && $cmd(base64_encode($c['smtp_senha']), '235')
       && $cmd("MAIL FROM:<{$remetente}>", '250')
       && $cmd("RCPT TO:<{$c['destino']}>", '250')
       && $cmd('DATA', '354');
    if ($ok) {
        $dados = implode("\r\n", array_merge($cab, ["To: <{$c['destino']}>", "Subject: {$assuntoCod}", 'Date: ' . date('r')]))
               . "\r\n\r\n" . preg_replace('/^\./m', '..', $msg);
        $ok = $cmd($dados . "\r\n.", '250');
    }
    $cmd('QUIT', '221');
    fclose($s);
    return $ok;
}
