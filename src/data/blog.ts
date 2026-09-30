// Categorias do blog (copy: seção 12.2) e utilidades de listagem.
import type { CollectionEntry } from 'astro:content';

export const categoriasBlog = ['Google Ads', 'Meta Ads', 'SEO', 'CRM e vendas', 'Sites e conversão'] as const;
export type CategoriaBlog = (typeof categoriasBlog)[number];

export const iconeCategoria: Record<CategoriaBlog, 'alvo' | 'coracao' | 'relatorio' | 'funil' | 'grade'> = {
  'Google Ads': 'alvo',
  'Meta Ads': 'coracao',
  SEO: 'relatorio',
  'CRM e vendas': 'funil',
  'Sites e conversão': 'grade',
};

export const ordenarPosts = (posts: CollectionEntry<'blog'>[]) =>
  [...posts].sort((a, b) => b.data.data.getTime() - a.data.data.getTime());

export const dataPorExtenso = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const tempoDeLeitura = (texto = '') => Math.max(1, Math.round(texto.split(/\s+/).filter(Boolean).length / 200));
