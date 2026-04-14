import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./features/templates/templates.component').then(m => m.TemplatesComponent),
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./features/editor/editor.component').then(m => m.EditorComponent),
    canActivate: [authGuard],
  },
  {
    path: 'editor/:resumeId',
    loadComponent: () =>
      import('./features/editor/editor.component').then(m => m.EditorComponent),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'payment-success',
    loadComponent: () =>
      import('./features/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent),
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./features/success/success.component').then(m => m.SuccessComponent),
    canActivate: [authGuard],
  },
  {
    path: 'success/:resumeId',
    loadComponent: () =>
      import('./features/success/success.component').then(m => m.SuccessComponent),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent),
      },
    ],
  },
  {
    path: 'privacidade',
    loadComponent: () =>
      import('./features/privacidade/privacidade.component').then(m => m.PrivacidadeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
