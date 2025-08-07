import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/avatar.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://getcvfolio.com',
  author: {
    avatar,
    name: 'Mohammad Alviyan Anwari',
    headline: 'Backend Engineer & Poultry Farmer',
    username: 'iian',
    location: 'Kediri City',
    pronouns: 'He/Him',
  },
  seo: {
    title: 'Mohammad Alviyan Anwari — Backend Engineer & Poultry Farmer',
    description: 'Backend Engineer with expertise in Golang and JavaScript, building scalable systems. Also a dedicated poultry farmer breeding Muscovy ducks and chickens in Kediri City.',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@mohammadalviyan'
    },
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    keywords: 'Mohammad Alviyan Anwari, Backend Engineer, Golang, JavaScript, API Development, System Architecture, Poultry Farming, Muscovy Ducks, Chickens, Kediri City, Software Developer',
  }
};