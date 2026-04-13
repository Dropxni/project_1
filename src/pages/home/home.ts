import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Product } from '../../shared/interfaces/product';
import { Dialog } from '../../components/dialog/dialog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, Dialog],
  templateUrl: './home.html'
})
export class HomePage {

  private authService = inject(AuthService);

  @ViewChild(Dialog) dialog!: Dialog;

  user = computed(() => this.authService.user());

  products = signal<Product[]>([
    {
      id: 1,
      nombre: 'Mouse Inalámbrico Pro',
      descripcion: 'Mouse ergonómico de alta precisión con conexión inalámbrica.',
      imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80',
      precio: 499,
      precioSalida: 650,
      stock: 18,
      categoria: 'Accesorios',
      colorConserve: 'Negro mate'
    },
  ]);

  constructor() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const products = await this.authService.getProducts();

      if (products) {
        this.products.set(products);
      }

      console.log(products);
    } catch (error) {
      console.error('Error obteniendo productos:', error);
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  onNewProduct(): void {
    this.dialog.open();
  }
}