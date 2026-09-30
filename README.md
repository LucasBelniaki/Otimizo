# Otimizo · Site oficial

Repositório do novo site institucional da Otimizo.

| Pasta ou arquivo | O que tem |
| --- | --- |
| `docs/copy-site.md` | Texto de todas as páginas do site |
| `CLAUDE.md` | Regras que o Claude Code segue ao construir o site |
| `Logos Otimizo/` | Logos da marca |
| `referencias/` | Imagens de inspiração de design |
| `Documentos/` | Arquivos de apoio (fotos, logos de clientes, selos) |

Para subir arquivos: **Add file → Upload files**, arraste os arquivos e clique em **Commit changes**.

## Publicação automática na Hostinger

Toda alteração na branch `main` publica o site sozinha, em cerca de 2 minutos. Para isso funcionar, você cadastra os dados de acesso da Hostinger no GitHub **uma única vez**.

### Passo 1. Pegar os dados de FTP na Hostinger

1. Entre no **hPanel** da Hostinger e abra o site.
2. Vá em **Arquivos → Contas FTP**.
3. Anote três informações:
   - **Hostname ou IP do FTP** (algo como `ftp.otimizo.com.br` ou `123.45.67.89`)
   - **Nome de usuário do FTP** (algo como `u123456789.otimizo.com.br`)
   - **Senha**: se não lembrar, clique em **Alterar senha da conta FTP** e crie uma nova.

### Passo 2. Cadastrar esses dados no GitHub

1. Neste repositório, clique em **Settings** (Configurações), no topo.
2. No menu da esquerda: **Secrets and variables → Actions**.
3. Clique em **New repository secret** e crie um segredo de cada vez, com estes nomes exatos:

| Nome do segredo | O que colocar |
| --- | --- |
| `FTP_SERVIDOR` | O hostname ou IP do FTP |
| `FTP_USUARIO` | O nome de usuário do FTP |
| `FTP_SENHA` | A senha do FTP |

Os segredos ficam guardados de forma criptografada: nem você nem ninguém consegue ver o valor depois de salvo, só substituir.

### Passo 3. Publicar pela primeira vez

1. Clique na aba **Actions**, no topo do repositório.
2. À esquerda, clique em **Publicar site na Hostinger**.
3. Clique em **Run workflow** e confirme.
4. Aguarde o círculo amarelo ficar verde. Pronto: o site está no ar.

Dali em diante, não precisa fazer mais nada: cada alteração na `main` repete esse processo sozinha.

### Formulário de contato (opcional, mas recomendado)

Os formulários enviam os pedidos para **contato@otimizodigital.com.br**. Para o e-mail chegar com segurança (sem cair no spam), o site usa uma conta de e-mail da Hostinger para enviar:

1. No hPanel, vá em **E-mails** e crie uma conta, por exemplo `site@otimizo.com.br`.
2. No GitHub, crie mais dois segredos (mesmo caminho do passo 2):

| Nome do segredo | O que colocar |
| --- | --- |
| `SMTP_USUARIO` | O e-mail criado (ex.: `site@otimizo.com.br`) |
| `SMTP_SENHA` | A senha desse e-mail |

3. Rode a publicação de novo (passo 3). Depois, faça um envio de teste pelo site.

Sem esses dois segredos, o site tenta enviar pelo sistema padrão da Hostinger, que funciona na maioria dos casos, mas tem mais chance de cair no spam.

### Se algo der errado

- **Círculo vermelho na aba Actions**: clique nele e depois em **Enviar para a Hostinger** para ver a mensagem de erro.
- **Erro de conexão ou de certificado**: crie o segredo `FTP_PROTOCOLO` com o valor `ftp` e rode de novo.
- **Aviso "Site não publicado"**: faltam os segredos do passo 2.

## Para quem for mexer no código

O site é feito em [Astro](https://astro.build) + Tailwind e gera HTML estático.

| Comando | O que faz |
| --- | --- |
| `npm install` | Instala as dependências (uma vez) |
| `npm run dev` | Abre o site em `http://localhost:4321` para editar |
| `npm run build` | Gera a versão final na pasta `dist/` |

- **Textos globais e links:** `src/data/site.ts`. Páginas em `src/pages/`, componentes em `src/components/`, cores e fontes em `src/styles/global.css`.
- **Logos de clientes:** arquivos WebP em `public/img/clientes/` e a lista em `src/components/home/LogosClientes.astro`.
- **Medição:** preencha `gtmId` em `src/data/site.ts` com o ID do Google Tag Manager. O site já envia para o `dataLayer` os eventos `clique_whatsapp`, `clique_consultoria`, `envio_formulario` e, na página /obrigado, `conversao_consultoria`.
- **Publicação:** `.github/workflows/publicar.yml`.
