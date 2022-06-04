import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
})
export class UpdateCustomerComponent implements OnInit {
  public customer: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

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

  init_data() {
    this.customerService.read_customer_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.customer = res.data;
          this.myForm.patchValue(this.customer);
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/customers');
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

    this.load_btn = true;
    this.customerService.update_customer(this.id, this.myForm.value).subscribe({
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
