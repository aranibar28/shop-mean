import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  public category: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/images/category.png';
  public imgCurrent: any | ArrayBuffer = './assets/images/category.png';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    icon: ['', [Validators.required]],
    description: [, [Validators.required]],
  });

  init_data() {
    this.categoryService.read_category_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.category = res.data;
          this.myForm.patchValue(this.category);
          this.imgSelected = `${base_url}/categories/image/${this.category.image}`;
          this.imgCurrent = `${base_url}/categories/image/${this.category.image}`;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/categories');
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
    this.categoryService.update_category(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/categories');
        Swal.fire('Muy Bien!', 'Se actualizó correctamente', 'success');
      },
      error: () => {
        this.load_btn = false;
        Swal.fire('Error!', 'Algo salió mal.', 'error');
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
