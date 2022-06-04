import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/core/categories/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  public categories: any;
  public config: any = {};
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/images/product.png';
  public imgCurrent: any | ArrayBuffer = './assets/images/product.png';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.config = { height: 500 };
    this.categoryService
      .read_category('')
      .subscribe(({ data }) => (this.categories = data));
  }

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    price: [, [Validators.required]],
    stock: [, [Validators.required]],
    category: ['', [Validators.required]],
    container: [''],
    description: [''],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.file) {
      this.load_btn = true;
      this.productService
        .create_product(this.myForm.value, this.file)
        .subscribe({
          next: () => {
            this.load_btn = false;
            this.router.navigateByUrl('/dashboard/products');
            Swal.fire('Muy Bien!', 'Se guardó correctamente', 'success');
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
        const array = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (array.includes(file.type)) {
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
