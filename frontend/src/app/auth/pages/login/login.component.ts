import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public user: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.token) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: [, [Validators.required, Validators.pattern(this.pattern)]],
    password: [, [Validators.required]],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login_public(this.loginForm.value).subscribe({
      next: (res) => {
        this.user = res.data;
        this.router.navigateByUrl('/');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.authService.success(`Bienvenido usuario!`);
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  validator(name: string) {
    const input = this.loginForm.controls[name];
    return input.errors && input.touched;
  }
}
