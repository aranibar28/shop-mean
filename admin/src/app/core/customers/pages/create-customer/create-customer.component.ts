import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styles: [],
})
export class CreateCustomerComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required]],
    email: [, [Validators.required]],
    password: [, [Validators.required]],
    dni: [, [Validators.required]],
    phone: [, [Validators.required]],
    genre: ['', [Validators.required]],
    birthday: [, [Validators.required]],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.load_btn = true;
    this.customerService.create_customer_admin(this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/customers');
        Swal.fire('OK!', 'Se guardó correctamente', 'success');
      },
      error: (err) => {
        this.load_btn = false;
        Swal.fire('Error!', err.error.msg, 'error');
      },
    });
  }

  validate(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
