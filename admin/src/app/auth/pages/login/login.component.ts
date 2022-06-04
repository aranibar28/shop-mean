import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['aranibar28@gmail.com', [Validators.required, Validators.pattern(this.pattern)]],
    password: ['123456', [Validators.required]],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login_user(this.loginForm.value).subscribe({
      next: (res: any) => {       
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
        Swal.fire({
          icon: 'success',
          title: `Bienvenido ${res.data.last_name}`,
          showConfirmButton: false,
          timer: 1500,
        });
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
