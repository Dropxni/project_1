import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<User | null>(null);
  session = signal<Session | null>(null);
  loading = signal<boolean>(false);
  initialized = signal<boolean>(false);
  supabase: any;

  constructor(private router: Router) {
    this.loadSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
      this.initialized.set(true);
    });
  }

  async loadSession(): Promise<void> {
    this.loading.set(true);

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      this.session.set(data.session);
      this.user.set(data.session?.user ?? null);
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
    } finally {
      this.loading.set(false);
      this.initialized.set(true);
    }
  }

  async waitForInitialization(): Promise<void> {
    if (this.initialized()) {
      return;
    }

    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (this.initialized()) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    this.loading.set(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      this.session.set(data.session);
      this.user.set(data.user);

      await this.router.navigate(['/home']);
    } catch (error: any) {
      throw new Error(error.message || 'No se pudo iniciar sesión');
    } finally {
      this.loading.set(false);
    }
  }

  async signOut(): Promise<void> {
    this.loading.set(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      this.session.set(null);
      this.user.set(null);

      await this.router.navigate(['/login']);
    } catch (error: any) {
      throw new Error(error.message || 'No se pudo cerrar sesión');
    } finally {
      this.loading.set(false);
    }
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }

   async getProducts () {
    const { data: products, error } = await this.supabase
      .from('products')
      .select('*')
    if (error) {
      throw new Error( 'Error' + error.message);
    }
    return products;
  }
}