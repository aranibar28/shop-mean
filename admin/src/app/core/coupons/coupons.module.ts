import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './pages/index-coupon/index-coupon.component';
import { UpdateCouponComponent } from './pages/update-coupon/update-coupon.component';

@NgModule({
  declarations: [
    CreateCouponComponent,
    IndexCouponComponent,
    UpdateCouponComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class CouponsModule {}
