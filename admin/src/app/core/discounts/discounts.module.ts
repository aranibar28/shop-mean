import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexDiscountComponent } from './pages/index-discount/index-discount.component';
import { UpdateDiscountComponent } from './pages/update-discount/update-discount.component';
import { CreateDiscountComponent } from './pages/create-discount/create-discount.component';

@NgModule({
  declarations: [
    IndexDiscountComponent,
    UpdateDiscountComponent,
    CreateDiscountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class DiscountsModule {}
