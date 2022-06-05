import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from '../../services/discount.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-update-discount',
  templateUrl: './update-discount.component.html',
})
export class UpdateDiscountComponent implements OnInit {
  public discount: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/images/category.png';
  public imgCurrent: any | ArrayBuffer = './assets/images/category.png';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private discountService: DiscountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    discount: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    finish_date: [, [Validators.required]],
  });

  init_data() {
    this.discountService.read_discount_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.discount = res.data;
          this.myForm.patchValue(this.discount);
          this.imgSelected = `${base_url}/discounts/image/${this.discount.banner}`;
          this.imgCurrent = `${base_url}/discounts/image/${this.discount.banner}`;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/discounts');
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
      this.myForm.addControl('banner', img);
    }
    this.load_btn = true;
    this.discountService.update_discount(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/discounts');
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
