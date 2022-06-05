import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from '../../services/discount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
})
export class CreateDiscountComponent implements OnInit {
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/images/category.png';
  public imgCurrent: any | ArrayBuffer = './assets/images/category.png';

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    discount: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    finish_date: [, [Validators.required]],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.file) {
      this.load_btn = true;
      this.discountService
        .create_discount(this.myForm.value, this.file)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/dashboard/discounts');
            Swal.fire('OK', 'Datos enviados', 'success');
          },
        });
    } else {
      Swal.fire('Ups!', 'Es obligatorio subir una imagen.', 'error');
    }
  }

  validate(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }

  fileChanged(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.file = undefined;
      this.imgSelected = this.imgCurrent;
    } else {
      if (file.size <= 4000000) {
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpg' ||
          file.type === 'image/gif' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/webp'
        ) {
          const reader = new FileReader();
          reader.onload = () => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);
          this.file = file;
        } else {
          this.file = undefined;
          this.imgSelected = this.imgCurrent;
          Swal.fire('Ups!', 'El archivo debe ser una imagen', 'error');
        }
      } else {
        this.file = undefined;
        this.imgSelected = this.imgCurrent;
        Swal.fire('Ups!', 'La imagen no puede superar los 4MB', 'error');
      }
    }
  }
}
