import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AccountComponent } from './account.component';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IndexOrderComponent } from './pages/orders/index-order/index-order.component';
import { DetailOrderComponent } from './pages/orders/detail-order/detail-order.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { TimePipe } from 'src/app/pipes/time.pipe';

@NgModule({
  declarations: [
    AccountComponent,
    AddressComponent,
    ProfileComponent,
    IndexOrderComponent,
    DetailOrderComponent,
    ReviewsComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AccountModule {}
