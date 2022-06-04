import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
})
export class CreateEmployeeComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required]],
    email: [, [Validators.required]],
    password: [, [Validators.required]],
    dni: [''],
    genre: [''],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.employeeService.create_user(this.myForm.value).subscribe({
      next: () => {       
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/employees');
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
