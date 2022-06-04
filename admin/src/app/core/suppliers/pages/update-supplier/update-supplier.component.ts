import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
})
export class UpdateSupplierComponent implements OnInit {
  public supplier: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    company: [, [Validators.required, Validators.minLength(3)]],
    ruc: [, [Validators.required]],
    manager: [, [Validators.required]],
    dni: [, [Validators.required]],
    direction: [, [Validators.required]],
    phone: [, [Validators.required]],
    email: [, [Validators.required]],
  });

  init_data() {
    this.supplierService.read_supplier_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.supplier = res.data;
          this.myForm.patchValue(this.supplier);
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/suppliers');
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

    this.load_btn = true;
    this.supplierService.update_supplier(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/suppliers');
        Swal.fire('OK!', 'Se guardó correctamente', 'success');
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
}
