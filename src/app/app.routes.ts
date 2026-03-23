import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];