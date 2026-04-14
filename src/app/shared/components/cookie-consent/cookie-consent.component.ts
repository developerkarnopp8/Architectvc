import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

const COOKIE_KEY = 'architect_cv_cookie_consent';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center">
        <div class="w-full max-w-3xl bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">

          <div class="flex-1 min-w-0">
            <p class="text-sm text-on-surface font-body leading-relaxed">
              <span class="font-bold text-primary">🍪 Cookies & Privacidade</span><br>
              Usamos cookies para melhorar sua experiência, salvar seu progresso e analisar o uso da plataforma.
              Ao continuar, você concorda com nossa
              <a href="/privacidade" class="text-primary underline hover:opacity-80 transition-opacity">Política de Privacidade</a>.
            </p>
          </div>

          <div class="flex gap-3 flex-shrink-0">
            <button (click)="decline()"
              class="px-4 py-2 rounded-xl text-sm font-semibold font-label text-secondary border border-outline-variant/40 hover:bg-surface-container-high transition-all">
              Recusar
            </button>
            <button (click)="accept()"
              class="px-5 py-2 rounded-xl text-sm font-bold font-label hero-gradient text-on-primary shadow-md hover:opacity-90 active:scale-95 transition-all">
              Aceitar
            </button>
          </div>

        </div>
      </div>
    }
  `,
})
export class CookieConsentComponent implements OnInit {
  visible = signal(false);

  ngOnInit(): void {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      this.visible.set(true);
    }
  }

  accept(): void {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    this.visible.set(false);
  }

  decline(): void {
    localStorage.setItem(COOKIE_KEY, 'declined');
    this.visible.set(false);
  }
}
