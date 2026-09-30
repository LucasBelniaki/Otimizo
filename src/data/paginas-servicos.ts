// Conteúdo das páginas de serviço. Texto: docs/copy-site.md, seções 6 a 10.

export type SlugServico = 'google-ads' | 'meta-ads' | 'sites-e-landing-pages' | 'social-media' | 'branding';

export interface PaginaServico {
  slug: SlugServico;
  nome: string; // usado na mensagem do WhatsApp
  title: string;
  description: string;
  chamada: string;
  h1: string;
  texto: string;
  botao: string;
  sinais: string[];
  incluido: string[];
  tambem?: { titulo: string; nome: string; texto: string }[];
  tambemPendencia?: string;
  resultado: string;
  faq: { p: string; r: string }[];
  final: { titulo: string; texto: string };
  vejaTambem: SlugServico[];
}

export const paginasServicos: PaginaServico[] = [
  {
    slug: 'google-ads',
    nome: 'Google Ads',
    title: 'Gestão de Google Ads para empresas · Otimizo',
    description: 'Campanhas de Google Ads focadas em intenção de compra, com custo por lead e por venda medidos de ponta a ponta. Agende uma consultoria gratuita.',
    chamada: 'Serviços · Google Ads',
    h1: 'Google Ads para aparecer para quem já está procurando você',
    texto: 'Estruturamos campanhas de pesquisa, Performance Max e remarketing focadas em intenção de compra. Sua verba vai para os termos que geram orçamento, não para curiosos e cliques genéricos.',
    botao: 'Agendar consultoria sobre Google Ads',
    sinais: [
      'Campanha ativa há meses sem ninguém saber quanto custa uma venda.',
      'Verba consumida por palavras-chave genéricas e curiosos.',
      'Contatos chegando de fora da sua região ou fora do perfil.',
      'Você não sabe quais termos trazem cliente e quais só gastam.',
    ],
    incluido: [
      'Pesquisa de palavras-chave por intenção e por região',
      'Estrutura de campanhas, anúncios e extensões',
      'Rastreamento de conversões: formulário, WhatsApp e ligação',
      'Integração com o CRM para medir venda, não só lead',
      'Otimização semanal de lances, termos e anúncios',
      'Relatório mensal com custo por lead e por venda',
    ],
    tambem: [
      { titulo: 'YouTube Ads', nome: 'youtube', texto: 'Anúncios em vídeo no YouTube, criados e gerenciados pelo próprio Google Ads, para apresentar sua empresa a quem pesquisa o seu tema.' },
    ],
    resultado: 'Reduzir o custo por oportunidade qualificada e tornar previsível o volume de orçamentos que entra todo mês.',
    faq: [
      { p: 'Quanto preciso investir em Google Ads?', r: 'Depende da concorrência do seu serviço e da sua região. Na consultoria gratuita estimamos a verba mínima para gerar um volume de contatos que justifique o investimento.' },
      { p: 'Em quanto tempo aparecem os primeiros contatos?', r: 'Normalmente nas primeiras semanas depois da publicação. O custo por venda ganha consistência entre o 2º e o 3º mês de otimização.' },
      { p: 'A verba de anúncio está inclusa no valor da Otimizo?', r: 'Não. A verba é paga direto ao Google, na conta da sua empresa. Você mantém a propriedade da conta e do histórico.' },
    ],
    final: {
      titulo: 'Quero avançar com Google Ads',
      texto: 'Agende uma consultoria gratuita de cerca de uma hora. Conversamos sobre o seu negócio e mostramos como o Google Ads pode trazer clientes para ele.',
    },
    vejaTambem: ['sites-e-landing-pages', 'meta-ads'],
  },
  {
    slug: 'meta-ads',
    nome: 'Meta Ads',
    title: 'Meta Ads: Facebook e Instagram para vender · Otimizo',
    description: 'Gestão de Meta Ads com criativos testados, públicos certos e leads qualificados para o seu time comercial.',
    chamada: 'Serviços · Meta Ads',
    h1: 'Meta Ads: Facebook e Instagram para gerar demanda qualificada',
    texto: 'Criamos campanhas de prospecção, remarketing e reativação no Facebook e no Instagram, com criativos pensados para o seu público e testes contínuos de oferta. O objetivo não é lead barato. É lead que vira cliente.',
    botao: 'Agendar consultoria sobre Meta Ads',
    sinais: [
      'Você impulsiona posts sem estratégia e sem saber o retorno.',
      'Os leads são baratos, mas quase nenhum fecha.',
      'Os criativos cansam rápido e param de performar.',
    ],
    incluido: [
      'Definição de públicos, ofertas e funil de campanhas',
      'Produção e teste contínuo de criativos',
      'Formulários e páginas de captação integrados ao CRM e ao WhatsApp',
      'Remarketing por etapa de interesse',
      'Relatório mensal com volume de leads e taxa de qualificação',
    ],
    resultado: 'Gerar demanda constante para times comerciais que dependem de volume de contatos qualificados.',
    faq: [
      { p: 'Leads baratos valem a pena?', r: 'Só se viram clientes. Por isso acompanhamos a qualificação junto com o seu comercial e ajustamos formulários e públicos quando é melhor trocar volume por qualidade.' },
      { p: 'Preciso ter vídeos e fotos próprios?', r: 'Não é obrigatório para começar, mas material próprio costuma performar melhor que imagem de banco. Orientamos você a gravar o que for preciso.' },
    ],
    final: {
      titulo: 'Quero avançar com Meta Ads',
      texto: 'Agende uma consultoria gratuita de cerca de uma hora. Conversamos sobre o seu negócio e mostramos como o Facebook e o Instagram podem gerar clientes para ele.',
    },
    vejaTambem: ['social-media', 'sites-e-landing-pages', 'google-ads'],
  },
  {
    slug: 'sites-e-landing-pages',
    nome: 'Sites e landing pages',
    title: 'Criação de sites e landing pages que convertem · Otimizo',
    description: 'Sites institucionais e landing pages rápidos, responsivos e integrados ao CRM e ao WhatsApp, feitos para gerar contato qualificado.',
    chamada: 'Serviços · Sites e landing pages',
    h1: 'Sites e landing pages feitos para gerar contato, não só para enfeitar',
    texto: 'Projetamos sites institucionais e páginas de captação com foco em clareza da oferta, prova social e velocidade no celular. Cada página nasce com a pergunta: o que o visitante precisa ler para chamar você?',
    botao: 'Agendar consultoria sobre meu site',
    sinais: [
      'O site é bonito, mas não gera contato.',
      'A página demora para abrir e fica ruim no celular.',
      'O site está desatualizado e passa imagem de empresa parada.',
      'Você não sabe quantas visitas viram contato.',
    ],
    incluido: [
      'Arquitetura de conteúdo e copy orientada a conversão',
      'Design alinhado à identidade visual da marca',
      'Desenvolvimento responsivo, rápido e com SEO técnico básico',
      'Formulários integrados ao CRM e ao WhatsApp',
      'Medição de conversões e testes de melhoria',
    ],
    resultado: 'Transformar visitas em conversas comerciais com uma página que responde às dúvidas do cliente antes que ele precise perguntar.',
    faq: [
      { p: 'Em quanto tempo o site fica pronto?', r: 'Cerca de 3 semanas, a partir da aprovação do conteúdo.' },
      { p: 'Vou conseguir editar o site depois?', r: 'As atualizações ficam com a gente: quando precisar mudar algo no site, é só pedir que o nosso time cuida disso para você.' },
    ],
    final: {
      titulo: 'Quero avançar com meu site',
      texto: 'Agende uma consultoria gratuita de cerca de uma hora. Olhamos o seu site atual com você e mostramos o que faz uma página gerar contato.',
    },
    vejaTambem: ['google-ads', 'branding'],
  },
  {
    slug: 'social-media',
    nome: 'Social media',
    title: 'Gestão de redes sociais para empresas · Otimizo',
    description: 'Planejamento editorial, criação e publicação de conteúdo para Instagram, Facebook e LinkedIn, alinhados à sua estratégia comercial.',
    chamada: 'Serviços · Social media',
    h1: 'Social media que sustenta a decisão de compra',
    texto: 'Antes de contratar, seu cliente abre o seu Instagram. Planejamos, produzimos e publicamos conteúdo com linha editorial ligada ao que o seu comercial precisa comunicar, para que o perfil trabalhe a favor da venda.',
    botao: 'Agendar consultoria sobre minhas redes',
    sinais: [
      'O perfil está parado ou sem linha editorial.',
      'O conteúdo não conversa com o que você vende.',
      'Não há constância de publicação.',
    ],
    incluido: [
      'Planejamento editorial mensal',
      'Criação de posts, carrosséis e roteiros de vídeos curtos',
      'Adequação à identidade visual da marca',
      'Publicação e gestão de comentários',
      'Relatório de alcance, engajamento e contatos gerados',
    ],
    resultado: 'Dar credibilidade à sua marca no momento em que o cliente pesquisa antes de decidir.',
    faq: [
      { p: 'Vocês gravam os vídeos?', r: 'Não. Roteirizamos todos e orientamos a gravação, que é feita pelo seu time.' },
    ],
    final: {
      titulo: 'Quero avançar com social media',
      texto: 'Agende uma consultoria gratuita de cerca de uma hora. Conversamos sobre o que o seu perfil comunica hoje e o que deveria comunicar para vender mais.',
    },
    vejaTambem: ['branding', 'meta-ads'],
  },
  {
    slug: 'branding',
    nome: 'Branding e identidade visual',
    title: 'Branding e identidade visual para empresas · Otimizo',
    description: 'Posicionamento, tom de voz, identidade visual e manual de marca para sua empresa ser percebida como a escolha de maior valor.',
    chamada: 'Serviços · Branding',
    h1: 'Branding para ser percebido como a escolha de maior valor',
    texto: 'Construímos ou reposicionamos marcas: propósito, promessa, tom de voz, identidade visual e manual de aplicação. Uma marca clara facilita cada anúncio, cada post e cada negociação de preço.',
    botao: 'Agendar consultoria sobre minha marca',
    sinais: [
      'Cada material da empresa tem um visual diferente.',
      'O discurso muda de canal para canal.',
      'Você tem dificuldade para justificar um preço mais alto que o do concorrente.',
    ],
    incluido: [
      'Diagnóstico de marca e da concorrência',
      'Posicionamento, promessa e tom de voz',
      'Identidade visual e variações de logotipo',
      'Manual de aplicação da marca',
      'Aplicações em materiais e canais digitais',
    ],
    resultado: 'Ser lembrado e percebido como a escolha de maior valor no seu mercado.',
    faq: [
      { p: 'Preciso mudar meu logotipo?', r: 'Nem sempre. Muitas vezes o problema está no posicionamento e na aplicação, não no símbolo. Na consultoria gratuita avaliamos se vale evoluir ou recriar.' },
    ],
    final: {
      titulo: 'Quero avançar com branding',
      texto: 'Agende uma consultoria gratuita de cerca de uma hora. Conversamos sobre como a sua marca é percebida hoje e o que pode mudar.',
    },
    vejaTambem: ['sites-e-landing-pages', 'social-media'],
  },
];
