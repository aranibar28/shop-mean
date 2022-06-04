import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
})
export class CreateSupplierComponent implements OnInit {
  public load_btn: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    company: ['123', [Validators.required, Validators.minLength(3)]],
    ruc: ['2', [Validators.required]],
    manager: ['3', [Validators.required]],
    dni: ['4', [Validators.required]],
    direction: ['5', [Validators.required]],
    phone: ['6', [Validators.required]],
    email: ['7', [Validators.required]],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.supplierService.create_supplier(this.myForm.value).subscribe({
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
