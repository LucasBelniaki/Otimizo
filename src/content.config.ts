// Coleção de posts do blog. Cada post é um arquivo .md em src/content/blog;
// o nome do arquivo vira o endereço (ex.: /blog/crm-para-pequenas-empresas).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoriasBlog } from './data/blog';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    categoria: z.enum(categoriasBlog),
    data: z.coerce.date(),
    autor: z.string().default('Lucas Belniaki'),
  }),
});

export const collections = { blog };
