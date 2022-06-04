import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public id = this.profileService.id; // <-- id user
  public email_regx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public user: any = {};

  constructor(
    private profileService: ProfileService,
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
    email: [, [Validators.required, Validators.pattern(this.email_regx)]],
    password: [,],
    phone: [, [Validators.pattern('[9][0-9]{8}')]],
    dni: [, [Validators.pattern('[0-9]{8}')]],
  });

  init_data() {
    this.profileService.get_user_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.user = res.data;
          this.myForm.patchValue(this.user);
        } else {
          this.router.navigateByUrl('/dashboard');
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
    console.log(this.id, this.myForm.value);
  }
}
