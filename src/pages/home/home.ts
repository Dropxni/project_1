import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomePage {
  private authService = inject(AuthService);

  user = computed(() => this.authService.user());
  loading = computed(() => this.authService.loading());

  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}