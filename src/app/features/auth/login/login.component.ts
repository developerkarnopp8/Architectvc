import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

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
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">E-mail</label>
          <input type="email" placeholder="voce@email.com" [(ngModel)]="email"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all" />
        </div>
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Senha</label>
          <input type="password" placeholder="••••••••" [(ngModel)]="password"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all" />
        </div>
        <button class="w-full hero-gradient text-white py-4 rounded-xl font-bold font-label shadow-lg hover:opacity-90 transition-all">
          Entrar
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
  email = '';
  password = '';
}
