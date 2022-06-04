import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
})
export class UpdateCouponComponent implements OnInit {
  public coupon: any = {};
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private couponService: CouponService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    code: [, [Validators.required, Validators.minLength(3)]],
    type: [, [Validators.required]],
    value: [, [Validators.required]],
    limit: [, [Validators.required]],
  });

  init_data() {
    this.couponService.read_coupon_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.coupon = res.data;
          this.myForm.patchValue(this.coupon);
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/coupons');
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

    this.load_btn = true;
    this.couponService.update_coupon(this.id, this.myForm.value).subscribe({
      next: () => {
        this.load_btn = false;
        this.router.navigateByUrl('/dashboard/coupons');
        Swal.fire('OK!', 'Se guardó correctamente', 'success');
      },
      error: () => {
        this.load_btn = false;
        Swal.fire('Error!', 'Algo salió mal.', 'error');
      },
    });
  }

  validate(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
