import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../core/auth/auth.service';

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
      <div class="bg-white p-8 rounded-2xl shadow-editorial space-y-6">
        @if (error()) {
          <div class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 font-body">
            {{ error() }}
          </div>
        }
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">E-mail</label>
          <input type="email" placeholder="voce@email.com" [(ngModel)]="email"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all" />
        </div>
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Senha</label>
          <input type="password" placeholder="••••••••" [(ngModel)]="password"
            (keydown.enter)="submit()"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all" />
        </div>
        <button (click)="submit()" [disabled]="loading()"
          class="w-full hero-gradient text-white py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
          {{ loading() ? 'Entrando...' : 'Entrar' }}
        </button>
        <p class="text-center text-sm text-secondary font-body">
          Não tem conta?
          <a routerLink="/auth/register" class="text-primary font-bold hover:underline">Criar agora</a>
        </p>
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  email    = '';
  password = '';
  loading  = signal(false);
  error    = signal('');

  submit(): void {
    if (!this.email || !this.password) {
      this.error.set('Preencha e-mail e senha.');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        if (this.auth.hasPendingResume()) {
          this.router.navigate(['/editor']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Erro ao entrar. Tente novamente.');
        this.loading.set(false);
      },
    });
  }
}
