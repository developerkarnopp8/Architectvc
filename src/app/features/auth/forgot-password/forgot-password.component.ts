import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 max-w-md mx-auto">
      <div class="text-center mb-10">
        <h1 class="font-headline text-4xl font-extrabold text-primary mb-2">Recuperar Senha</h1>
        <p class="text-secondary font-body">Digite seu e-mail e enviaremos as instruções.</p>
      </div>

      <div class="bg-surface-container p-8 rounded-2xl shadow-editorial border border-outline-variant/20 space-y-6">

        @if (sent()) {
          <div class="text-center space-y-4 py-4">
            <span class="material-symbols-outlined text-5xl text-primary">mark_email_read</span>
            <p class="text-on-surface font-body">
              Se o e-mail <strong>{{ email }}</strong> estiver cadastrado, você receberá as instruções em breve.
            </p>
            <p class="text-secondary text-sm font-body">Verifique também sua caixa de spam.</p>
          </div>
        } @else {
          @if (error()) {
            <div class="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3 font-body">
              {{ error() }}
            </div>
          }

          <div>
            <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">E-mail</label>
            <input type="email" placeholder="voce@email.com" [(ngModel)]="email"
              (keydown.enter)="submit()"
              class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
          </div>

          <button type="button" (click)="submit()" [disabled]="loading()"
            class="w-full hero-gradient text-on-primary py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {{ loading() ? 'Enviando...' : 'Enviar instruções' }}
          </button>
        }

        <p class="text-center text-sm text-secondary font-body">
          Lembrou a senha?
          <a routerLink="/auth/login" class="text-primary font-bold hover:underline">Entrar</a>
        </p>
      </div>
    </main>
    <app-footer />
  `,
})
export class ForgotPasswordComponent {
  private http = inject(HttpClient);

  email   = '';
  loading = signal(false);
  error   = signal('');
  sent    = signal(false);

  submit(): void {
    if (!this.email) { this.error.set('Informe o e-mail.'); return; }
    this.loading.set(true);
    this.error.set('');

    this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email: this.email }).subscribe({
      next: () => { this.sent.set(true); this.loading.set(false); },
      error: () => { this.error.set('Erro ao enviar. Tente novamente.'); this.loading.set(false); },
    });
  }
}
