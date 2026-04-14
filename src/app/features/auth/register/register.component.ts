import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';

const INPUT_CLASS = 'w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="pt-32 pb-24 px-6 max-w-md mx-auto">
      <div class="text-center mb-10">
        <h1 class="font-headline text-4xl font-extrabold text-primary mb-2">Criar Conta</h1>
        <p class="text-secondary font-body">Comece a construir seu currículo agora.</p>
      </div>
      <div class="bg-surface-container p-8 rounded-2xl shadow-editorial border border-outline-variant/20 space-y-6">
        @if (error()) {
          <div class="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3 font-body">
            {{ error() }}
          </div>
        }
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Nome Completo</label>
          <input type="text" placeholder="Seu nome" [(ngModel)]="name"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 outline-none transition-all text-white placeholder:text-white/40" />
        </div>
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
          {{ loading() ? 'Criando conta...' : 'Criar Conta Grátis' }}
        </button>
        <p class="text-center text-sm text-secondary font-body">
          Já tem conta?
          <a routerLink="/auth/login" class="text-primary font-bold hover:underline">Entrar</a>
        </p>
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private toast  = inject(ToastService);

  name         = '';
  email        = '';
  password     = '';
  loading      = signal(false);
  error        = signal('');
  showPassword = signal(false);

  submit(): void {
    if (!this.name || !this.email || !this.password) {
      this.error.set('Preencha todos os campos.');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.toast.success('Conta criada com sucesso!', 'Bem-vindo ao Architect CV.');
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
        this.toast.error('Erro ao criar conta', err?.error?.message ?? 'Tente novamente.');
        this.error.set(err?.error?.message ?? 'Erro ao criar conta. Tente novamente.');
        this.loading.set(false);
      },
    });
  }
}
