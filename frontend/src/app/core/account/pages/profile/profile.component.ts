import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public id = this.customersService.id; // <-- id cliente
  public regx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public customer: any = {};

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.init_data();
    }
  }

  myForm: FormGroup = this.fb.group({
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required, Validators.minLength(3)]],
    email: [, [Validators.required, Validators.pattern(this.regx)]],
    password: [, []],
    phone: [, [Validators.required, Validators.pattern('[9][0-9]{8}')]],
    dni: [, [Validators.required, Validators.pattern('[0-9]{8}')]],
    birthday: [, []],
    gender: ['', []],
  });

  init_data() {
    this.customersService.read_customer_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.customer = res.data;
          this.myForm.patchValue(this.customer);
        } else {
          this.router.navigateByUrl('/');
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

    if ($('#input_password').val() == '') {
      this.myForm.controls['password'].setValue(this.customer.password);
    } else {
      this.myForm.controls['password'].setValue($('#input_password').val());
    }

    this.customersService
      .update_customer_by_id(this.id, this.myForm.value)
      .subscribe({
        next: () => {
          localStorage.setItem('x-user', JSON.stringify(this.myForm.value));
          this.router.navigateByUrl('/account');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          Swal.fire('Muy Bien!', 'Datos guardados correctamente', 'success');
        },
        error: (err) => {
          Swal.fire('Ups!', err.error.msg, 'error');
        },
      });
  }
}
