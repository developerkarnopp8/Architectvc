import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 max-w-md mx-auto">
      <div class="text-center mb-10">
        <h1 class="font-headline text-4xl font-extrabold text-primary mb-2">Bem-vindo de volta</h1>
        <p class="text-secondary font-body">Entre na sua conta para continuar.</p>
      </div>
      <div class="bg-surface-container p-8 rounded-2xl shadow-editorial border border-outline-variant/20 space-y-6">
        @if (error()) {
          <div class="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3 font-body">
            {{ error() }}
          </div>
        }
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">E-mail</label>
          <input type="email" placeholder="voce@email.com" [(ngModel)]="email"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
        </div>
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Senha</label>
          <div class="relative">
            <input [type]="showPassword() ? 'text' : 'password'" placeholder="••••••••" [(ngModel)]="password"
              (keydown.enter)="submit()"
              class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
            <button type="button" (click)="showPassword.set(!showPassword())"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
              <span class="material-symbols-outlined text-[20px]">{{ showPassword() ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>
        <button (click)="submit()" [disabled]="loading()"
          class="w-full hero-gradient text-on-primary py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
          {{ loading() ? 'Entrando...' : 'Entrar' }}
        </button>
        <div class="flex flex-col items-center gap-2">
          <a routerLink="/auth/forgot-password" class="text-sm text-secondary hover:text-primary transition-colors font-body">
            Esqueceu sua senha?
          </a>
          <p class="text-center text-sm text-secondary font-body">
            Não tem conta?
            <a routerLink="/auth/register" class="text-primary font-bold hover:underline">Criar agora</a>
          </p>
        </div>
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private toast  = inject(ToastService);

  email        = '';
  password     = '';
  loading      = signal(false);
  error        = signal('');
  showPassword = signal(false);

  submit(): void {
    if (!this.email || !this.password) {
      this.error.set('Preencha e-mail e senha.');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.toast.success('Login realizado!', 'Bem-vindo de volta.');
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (this.auth.hasPendingResume()) {
          this.router.navigate(['/editor']);
        } else if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.toast.error('Erro ao entrar', err?.error?.message ?? 'Verifique suas credenciais.');
        this.error.set(err?.error?.message ?? 'Erro ao entrar. Tente novamente.');
        this.loading.set(false);
      },
    });
  }
}
