import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

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
      <div class="bg-white p-8 rounded-2xl shadow-editorial space-y-6">
        <div>
          <label class="block text-xs font-bold text-secondary mb-2 font-label uppercase tracking-wider">Nome Completo</label>
          <input type="text" placeholder="Seu nome" [(ngModel)]="name"
            class="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all" />
        </div>
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
          Criar Conta Grátis
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
  name = '';
  email = '';
  password = '';
}
