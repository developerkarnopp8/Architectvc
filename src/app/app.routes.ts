import { Routes } from '@angular/router';

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
    // canActivate: [AuthGuard]  // Habilitado após implementar auth
  },
  {
    path: 'editor/:resumeId',
    loadComponent: () =>
      import('./features/editor/editor.component').then(m => m.EditorComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: 'success/:resumeId',
    loadComponent: () =>
      import('./features/success/success.component').then(m => m.SuccessComponent),
    // canActivate: [AuthGuard]
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
    path: '**',
    redirectTo: '',
  },
];
