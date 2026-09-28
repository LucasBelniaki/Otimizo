# Site institucional Otimizo

Novo site da Otimizo, agência de marketing e vendas de Araucária (PR) que atende escritórios de contabilidade, advocacia e PMEs de todo o Brasil. Objetivo do site: autoridade e conversão. A conversão principal é o agendamento da **consultoria gratuita** (on-line, cerca de 1 hora, com um especialista em marketing da Otimizo).

## Onde está cada coisa

- `docs/copy-site.md`: a copy de todas as páginas. Base do texto do site, sempre atualizada junto com ele.
- `Logos Otimizo/`: logos da marca.
- `referencias/`: imagens de inspiração de design (quando existirem).
- `Documentos/`: arquivos de apoio enviados pelo time.

## Prioridade

- **Pedidos feitos no chat têm prioridade sobre este arquivo.** Se um pedido contrariar alguma regra daqui, siga o pedido. Se a mudança for permanente, atualize também este arquivo.

## Regras de conteúdo

- Use `docs/copy-site.md` como base do texto. Não invente texto por conta própria.
- Quando eu pedir uma mudança de texto, ou pedir que você reescreva ou melhore um trecho, aplique no site e atualize `docs/copy-site.md` para os dois continuarem iguais.
- Nunca invente números, depoimentos, nomes de clientes ou selos, mesmo ao reescrever.
- Trechos entre [colchetes] são pendências. Mantenha-os visíveis e destacados no layout (ex.: fundo amarelo claro) para o time preencher depois.
- Linhas de orientação interna na copy (ex.: "Cards sem link", "Pautas sugeridas", notas sobre noindex) não aparecem no site.
- Na página e nas chamadas da consultoria gratuita, não mencionar vagas, faturamento, critérios de seleção nem temas específicos.
- O botão principal é sempre "Agendar minha consultoria gratuita"; o secundário, "Falar no WhatsApp".
- WhatsApp: https://wa.me/5541999842667 com as mensagens pré-preenchidas da seção "Elementos globais" da copy.

## Regras técnicas

- Mobile first. No celular, barra fixa no rodapé com "WhatsApp" e "Consultoria gratuita".
- Imagens em WebP, com lazy loading e dimensões definidas. Meta de Lighthouse acima de 90 no celular.
- Um H1 por página; title e meta description conforme a tabela "SEO" de cada página da copy.
- Schema.org LocalBusiness com o endereço: Rua Adelino Basso, 28, Centro, Araucária (PR), CEP 83702-430.
- Todos os formulários redirecionam para /obrigado, que leva noindex. Deixar pontos prontos para GTM, GA4, Pixel da Meta e conversão do Google Ads.
- Acessibilidade: contraste AA, texto alternativo nas imagens, foco visível, formulários com label.

## Como trabalhar

- Antes de construir, apresente um plano (estrutura, componentes, direção visual) e espere aprovação.
- Construa uma página por vez, começando pelos componentes globais e pela Home.
- Depois de cada página, tire prints em 390px e 1440px, revise e corrija antes de seguir.
