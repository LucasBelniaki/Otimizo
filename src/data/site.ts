// Dados globais do site. Textos conforme docs/copy-site.md (Elementos globais).

export const site = {
  nome: 'Otimizo',
  url: 'https://otimizo.com.br',
  // Preencher com o ID do contêiner do Google Tag Manager (ex.: GTM-XXXXXXX).
  // GA4, Pixel da Meta e conversão do Google Ads são configurados dentro do GTM.
  gtmId: '',
  email: 'contato@otimizodigital.com.br',
  telefone: '(41) 99984-2667',
  whatsappNumero: '5541999842667',
  endereco: {
    rua: 'Rua Adelino Basso, 28',
    bairro: 'Centro',
    cidade: 'Araucária',
    uf: 'PR',
    cep: '83702-430',
  },
  instagram: 'https://www.instagram.com/otimizodigital/',
  linkedin: 'https://www.linkedin.com/company/otimizo-marketing/',
  razaoSocial: 'Otimizo Marketing e Assessoria Ltda',
  cnpj: '54.732.693/0001-36',
};

export const cta = {
  principal: 'Agendar minha consultoria gratuita',
  secundario: 'Falar no WhatsApp',
  micro: ['Cerca de 1 hora', 'On-line', 'Sem custo'],
};

export const mensagensWhatsApp = {
  home: 'Olá! Vim pelo site da Otimizo e quero agendar uma consultoria gratuita.',
  servico: (servico: string) =>
    `Olá! Vim pela página de ${servico} e quero agendar uma consultoria gratuita.`,
  trabalheConosco: 'Olá! Tenho interesse em trabalhar na Otimizo.',
};

export function linkWhatsApp(mensagem: string = mensagensWhatsApp.home) {
  return `https://wa.me/${site.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

export const servicos = [
  { nome: 'Google Ads', href: '/servicos/google-ads', grupo: 'Atrair', frase: 'Apareça para quem já está procurando o que você vende.' },
  { nome: 'Meta Ads', href: '/servicos/meta-ads', grupo: 'Atrair', frase: 'Facebook e Instagram para gerar demanda para alcançar seus possíveis clientes.' },
  { nome: 'Sites e landing pages', href: '/servicos/sites-e-landing-pages', grupo: 'Converter', frase: 'Sites completos para gerar autoridade e confiança. Páginas rápidas e claras, feitas para gerar venda.' },
  { nome: 'Social media', href: '/servicos/social-media', grupo: 'Fortalecer a marca', frase: 'Conteúdo constante que sustenta a decisão de compra.' },
  { nome: 'Branding e identidade visual', href: '/servicos/branding', grupo: 'Fortalecer a marca', frase: 'Uma marca coerente em todos os pontos de contato.' },
] as const;

// Opções do campo "Como podemos te ajudar?" do formulário (pode marcar mais de uma)
export const opcoesAjuda = [
  'Site',
  'Landing page',
  'Google Ads',
  'Meta Ads',
  'Redes sociais',
  'Identidade visual',
  'Outros anúncios',
  'Ainda não sei',
];

export const menu = [
  { nome: 'Home', href: '/' },
  { nome: 'Serviços', href: '/servicos', submenu: servicos },
  { nome: 'Sobre', href: '/sobre' },
  { nome: 'Blog', href: '/blog' },
  { nome: 'Contato', href: '/contato' },
];

export const rodape = {
  apresentacao:
    'Agência de marketing e vendas para empresas e empreendedores de todo o Brasil. Estratégia, execução e números na mesma mesa.',
  otimizo: [
    { nome: 'Sobre', href: '/sobre' },
    { nome: 'Consultoria gratuita', href: '/consultoria-gratuita' },
    { nome: 'Projetos sociais', href: '/projetos-sociais' },
    { nome: 'Blog', href: '/blog' },
    { nome: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    { nome: 'Política de privacidade', href: '/politica-de-privacidade' },
  ],
  selos: ['Sócio Investidor do Hospital Pequeno Príncipe'],
};
