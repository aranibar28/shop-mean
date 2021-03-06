import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeComponent implements OnInit {
  public customer: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
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
    genre: ['', [Validators.required]],
  });

  init_data() {
    this.employeeService.read_user_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.customer = res.data;
          this.myForm.patchValue(this.customer);
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/employees');
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
    this.employeeService.update_user(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/employees');
        Swal.fire('OK!', 'Se guard?? correctamente', 'success');
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
