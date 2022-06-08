import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  public id = localStorage.getItem('x-id');
  public public_user: any = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logged();
  }

  logged() {
    if (this.authService.user) {
      this.public_user = JSON.parse(localStorage.getItem('x-user')!);
    } else {
      this.public_user = undefined;
    }
  }

  logout() {
    Swal.fire({
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/');
        window.location.reload();
      }
    });
  }
}
