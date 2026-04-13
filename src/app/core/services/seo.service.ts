import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const BASE_URL   = 'https://architectvc.aevon.online';
const SITE_NAME  = 'Architect CV';
const OG_IMAGE   = `${BASE_URL}/assets/logos/logo-512.png`;

const ROUTE_SEO: Record<string, SeoConfig> = {
  '/': {
    title: 'Architect CV — Crie seu Currículo Profissional Online',
    description: 'Crie currículos profissionais em minutos com templates exclusivos. Editor intuitivo, design otimizado para ATS e recrutadores. Gratuito para começar.',
    keywords: 'currículo online, criar currículo, template currículo, currículo profissional, cv online, modelo de currículo, currículo grátis',
    type: 'website',
  },
  '/templates': {
    title: 'Templates de Currículo Profissionais — Architect CV',
    description: 'Escolha entre templates modernos, criativos, executivos e minimalistas. Todos otimizados para sistemas ATS e recrutadores. Destaque-se no mercado.',
    keywords: 'templates currículo, modelos currículo, template cv profissional, currículo moderno, currículo criativo, currículo executivo',
    type: 'website',
  },
  '/auth/login': {
    title: 'Entrar — Architect CV',
    description: 'Acesse sua conta no Architect CV e continue criando seu currículo profissional.',
    noindex: true,
  },
  '/auth/register': {
    title: 'Criar Conta Grátis — Architect CV',
    description: 'Crie sua conta gratuita no Architect CV e comece a construir o currículo que vai mudar sua carreira.',
    keywords: 'criar conta, cadastro currículo, currículo grátis',
  },
  '/editor': {
    title: 'Editor de Currículo — Architect CV',
    description: 'Editor profissional de currículo com preview em tempo real.',
    noindex: true,
  },
  '/dashboard': {
    title: 'Meus Currículos — Architect CV',
    description: 'Gerencie seus currículos profissionais.',
    noindex: true,
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title  = inject(Title);
  private meta   = inject(Meta);
  private router = inject(Router);

  init(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e) => {
      const url = (e as NavigationEnd).urlAfterRedirects.split('?')[0];
      const config = ROUTE_SEO[url] ?? ROUTE_SEO['/'];
      this.apply({ ...config, url: `${BASE_URL}${url}` });
    });
  }

  apply(config: SeoConfig): void {
    const title = config.title;
    const desc  = config.description;
    const image = config.image ?? OG_IMAGE;
    const url   = config.url   ?? BASE_URL;
    const type  = config.type  ?? 'website';

    // Title
    this.title.setTitle(title);

    // Standard
    this.meta.updateTag({ name: 'description',      content: desc });
    this.meta.updateTag({ name: 'robots',           content: config.noindex ? 'noindex,nofollow' : 'index,follow' });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title',       content: title });
    this.meta.updateTag({ property: 'og:description',  content: desc });
    this.meta.updateTag({ property: 'og:image',        content: image });
    this.meta.updateTag({ property: 'og:url',          content: url });
    this.meta.updateTag({ property: 'og:type',         content: type });
    this.meta.updateTag({ property: 'og:site_name',    content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale',       content: 'pt_BR' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: title });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.meta.updateTag({ name: 'twitter:image',       content: image });

    // Canonical
    this._setCanonical(url);
  }

  private _setCanonical(url: string): void {
    const doc = document;
    let link: HTMLLinkElement | null = doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
