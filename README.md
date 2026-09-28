# Otimizo · Site oficial

Repositório do novo site institucional da Otimizo.

| Pasta ou arquivo | O que tem |
| --- | --- |
| `docs/copy-site.md` | Copy final de todas as páginas do site |
| `CLAUDE.md` | Regras que o Claude Code segue ao construir o site |
| `Logos Otimizo/` | Logos da marca |
| `referencias/` | Imagens de inspiração de design (subir aqui) |
| `Documentos/` | Arquivos de apoio |

Para subir arquivos: **Add file → Upload files**, arraste os arquivos ou pastas e clique em **Commit changes**.

## Como rodar e publicar

O site é feito em [Astro](https://astro.build) + Tailwind e gera HTML estático.

| Comando | O que faz |
| --- | --- |
| `npm install` | Instala as dependências (uma vez) |
| `npm run dev` | Abre o site em `http://localhost:4321` para editar |
| `npm run build` | Gera a versão final na pasta `dist/` |

**Publicar na Hostinger:** rode `npm run build` e envie o conteúdo da pasta `dist/` para `public_html` (Gerenciador de Arquivos ou FTP).

**Formulários:** no servidor, copie `public_html/api/config.example.php` para `config.php` e preencha o usuário e a senha de uma conta de e-mail criada no hPanel. Os envios vão para contato@otimizodigital.com.br e levam para `/obrigado`.

**Medição:** preencha `gtmId` em `src/data/site.ts` com o ID do Google Tag Manager. O site já envia os eventos `clique_whatsapp`, `clique_consultoria` e `envio_formulario` para o `dataLayer`.

**Onde fica cada coisa no código:** textos globais e links em `src/data/site.ts`, páginas em `src/pages/`, componentes em `src/components/`, cores e fontes em `src/styles/global.css`.
