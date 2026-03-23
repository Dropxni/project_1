import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-forn/login-forn';
import { AuthService } from '../../core/services/auth';
import { AuthCredentials } from '../../shared/interfaces/auth-credentials';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.html'
})
export class LoginPage {
  private authService = inject(AuthService);

  @ViewChild(LoginFormComponent) loginFormComponent?: LoginFormComponent;

  async onLogin(credentials: AuthCredentials): Promise<void> {
    this.loginFormComponent?.clearError();
    this.loginFormComponent?.setSubmitting(true);

    try {
      await this.authService.signIn(credentials.email, credentials.password);
    } catch (error: any) {
      this.loginFormComponent?.setError(
        error?.message || 'Ocurrió un error al iniciar sesión'
      );
    } finally {
      this.loginFormComponent?.setSubmitting(false);
    }
  }
}