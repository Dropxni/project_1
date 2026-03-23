import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCredentials } from '../../shared/interfaces/auth-credentials';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-forn.html',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  @Output() formSubmitted = new EventEmitter<AuthCredentials>();

  submitting = signal(false);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.formSubmitted.emit(this.form.getRawValue());
  }

  setSubmitting(value: boolean): void {
    this.submitting.set(value);
  }

  setError(message: string): void {
    this.errorMessage.set(message);
  }

  clearError(): void {
    this.errorMessage.set('');
  }
}