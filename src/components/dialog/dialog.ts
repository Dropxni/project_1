import { ChangeDetectionStrategy, Component, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog.html',
  styles: `
    :host {
      display: contents;
    }

    dialog {
      margin: auto;
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {

  private fb = inject(FormBuilder);

  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLDialogElement>;

  productForm = this.fb.group({
    nombre: ['', Validators.required],
    imagen: ['', Validators.required],
    categoria: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    precio_salida: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required]
  });

  open() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
    this.productForm.reset({
      precio: 0,
      precio_salida: 0,
      stock: 0
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
      this.close();
    }
  }
}