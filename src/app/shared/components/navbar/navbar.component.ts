import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private auth  = inject(AuthService);
  private toast = inject(ToastService);

  menuOpen   = signal(false);
  logoError  = signal(false);
  isLoggedIn  = this.auth.isLoggedIn;
  user        = this.auth.user;
  firstName   = computed(() => this.auth.user()?.name?.split(' ')[0] ?? '');

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }

  logout(): void {
    this.closeMenu();
    this.toast.info('Sessão encerrada', 'Até logo! Faça login para continuar.');
    this.auth.logout();
  }
}
