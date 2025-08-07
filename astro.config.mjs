// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://madebyalviyan.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
    concurrency: 8,
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
    domains: ["madebyalviyan.com"],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402689,
        avif: {
          quality: 85,
          effort: 6
        },
        webp: {
          quality: 90,
          effort: 6
        },
        jpeg: {
          quality: 85,
          mozjpeg: true
        }
      }
    }
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('lucide')) return 'icons';
              return 'vendor';
            }
          }
        }
      }
    }
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      optimize: true,
      syntaxHighlight: 'shiki',
    }),
  ],
  experimental: {
    fonts: [
      {
        name: 'Inter',
        cssVariable: '--font-inter',
        provider: 'local',
        variants: [
          {
            src: ['./src/assets/fonts/Inter-Regular.woff2'],
            style: 'normal',
            weight: 400,
          },
          {
            src: ['./src/assets/fonts/Inter-Medium.woff2'],
            style: 'normal',
            weight: 500,
          },
          {
            src: ['./src/assets/fonts/Inter-SemiBold.woff2'],
            style: 'normal',
            weight: 600,
          },
          {
            src: ['./src/assets/fonts/Inter-Bold.woff2'],
            style: 'normal',
            weight: 700,
          },
          {
            src: ['./src/assets/fonts/Inter-ExtraBold.woff2'],
            style: 'normal',
            weight: 800,
          },
        ],
      },
      {
        name: 'InterVariable',
        cssVariable: '--font-inter-variable',
        provider: 'local',
        variants: [
          {
            src: ['./src/assets/fonts/InterVariable.woff2'],
            style: 'normal',
            weight: 'variable',
          },
        ],
      },
    ],
  },
});
