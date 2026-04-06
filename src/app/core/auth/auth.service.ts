import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { User, LoginPayload, RegisterPayload } from '../models/user.model';

const TOKEN_KEY = 'architect_cv_token';
const USER_KEY  = 'architect_cv_user';

export interface AuthResponse {
  user: User;
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api    = inject(ApiService);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private _user  = signal<User | null>(this._loadUser());

  readonly token     = this._token.asReadonly();
  readonly user      = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());

  login(payload: LoginPayload) {
    return this.api.post<AuthResponse>('/auth/login', payload).pipe(
      tap(res => this._persist(res))
    );
  }

  register(payload: RegisterPayload) {
    return this.api.post<AuthResponse>('/auth/register', payload).pipe(
      tap(res => this._persist(res))
    );
  }

  refreshUser(): void {
    this.api.get<User>('/auth/me').subscribe({
      next: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this._user.set(user);
      },
      error: () => {
        // Token expirado ou inválido — faz logout silencioso
        this.logout();
      },
    });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  private _persist(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._token.set(res.accessToken);
    this._user.set(res.user);
  }

  hasPendingResume(): boolean {
    return !!localStorage.getItem('architect_cv_pending_resume');
  }

  consumePendingResume(): { templateId: string; data: unknown } | null {
    const raw = localStorage.getItem('architect_cv_pending_resume');
    if (!raw) return null;
    localStorage.removeItem('architect_cv_pending_resume');
    try { return JSON.parse(raw); } catch { return null; }
  }

  private _loadUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
