import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/core/categories/services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  public categories: Array<any> = [];
  public product: any = {};
  public config: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/images/product.png';
  public imgCurrent: any | ArrayBuffer = './assets/images/product.png';
  public id: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.config = { height: 500 };
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.categoryService
      .read_category('')
      .subscribe(({ data }) => (this.categories = data));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    price: [, [Validators.required]],
    stock: [, [Validators.required]],
    category: ['', [Validators.required]],
    description: [''],
    container: [''],
  });

  init_data() {
    this.productService.read_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.product = res.data;
          this.myForm.patchValue(this.product);
          this.imgSelected = `${base_url}/products/image/${this.product.image}`;
          this.imgCurrent = `${base_url}/products/image/${this.product.image}`;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/products');
        }
      },
      error: (err) => console.log(err),
    });
  }

  update() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.file) {
      const img = this.fb.control(this.file, Validators.required);
      this.myForm.addControl('image', img);
    }
    this.load_btn = true;
    this.productService.update_product(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/products');
        Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
      },
      error: (err) => {
        this.load_btn = false;
        console.log(err);
      },
    });
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
