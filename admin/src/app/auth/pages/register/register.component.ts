import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerForm = this.fb.group({
    first_name: ['Gerson', [Validators.required]],
    last_name: ['Aranibar', [Validators.required]],
    email: ['aranibar28@gmail.com', [Validators.required]],
    password: ['123456', [Validators.required]],
  });

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register_user(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
}
