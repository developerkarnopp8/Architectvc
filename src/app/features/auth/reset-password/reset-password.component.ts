import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 max-w-md mx-auto">
      <div class="text-center mb-10">
        <h1 class="font-headline text-4xl font-extrabold text-primary mb-2">Nova Senha</h1>
        <p class="text-secondary font-body">Digite e confirme sua nova senha.</p>
      </div>

      <div class="bg-surface-container p-8 rounded-2xl shadow-editorial border border-outline-variant/20 space-y-6">

        @if (!token()) {
          <div class="text-center py-4 space-y-3">
            <span class="material-symbols-outlined text-5xl text-error">link_off</span>
            <p class="text-secondary font-body">Link inválido ou expirado.</p>
            <a routerLink="/auth/forgot-password" class="text-primary font-bold hover:underline font-label">
              Solicitar novo link
            </a>
          </div>
        } @else if (done()) {
          <div class="text-center space-y-4 py-4">
            <span class="material-symbols-outlined text-5xl text-primary">check_circle</span>
            <p class="text-on-surface font-body">Senha redefinida com sucesso!</p>
            <a routerLink="/auth/login"
              class="inline-block hero-gradient text-on-primary px-6 py-3 rounded-xl font-bold font-label shadow-md hover:opacity-90 transition-all">
              Entrar agora
            </a>
          </div>
        } @else {
          @if (error()) {
            <div class="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3 font-body">
              {{ error() }}
            </div>
          }

          <div>
            <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Nova Senha</label>
            <div class="relative">
              <input [type]="showPassword() ? 'text' : 'password'" placeholder="Mínimo 6 caracteres" [(ngModel)]="password"
                class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
              <button type="button" (click)="showPassword.set(!showPassword())"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-[20px]">{{ showPassword() ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Confirmar Senha</label>
            <input type="password" placeholder="Repita a senha" [(ngModel)]="confirm"
              (keydown.enter)="submit()"
              class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
          </div>

          <button type="button" (click)="submit()" [disabled]="loading()"
            class="w-full hero-gradient text-on-primary py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {{ loading() ? 'Salvando...' : 'Redefinir Senha' }}
          </button>
        }
      </div>
    </main>
    <app-footer />
  `,
})
export class ResetPasswordComponent implements OnInit {
  private http  = inject(HttpClient);
  private route = inject(ActivatedRoute);

  token        = signal('');
  password     = '';
  confirm      = '';
  loading      = signal(false);
  error        = signal('');
  done         = signal(false);
  showPassword = signal(false);

  ngOnInit(): void {
    const t = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.token.set(t);
  }

  submit(): void {
    if (!this.password || this.password.length < 6) {
      this.error.set('A senha deve ter pelo menos 6 caracteres.'); return;
    }
    if (this.password !== this.confirm) {
      this.error.set('As senhas não coincidem.'); return;
    }
    this.loading.set(true);
    this.error.set('');

    this.http.post(`${environment.apiUrl}/auth/reset-password`, {
      token: this.token(),
      password: this.password,
    }).subscribe({
      next: () => { this.done.set(true); this.loading.set(false); },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Token inválido ou expirado.');
        this.loading.set(false);
      },
    });
  }
}
