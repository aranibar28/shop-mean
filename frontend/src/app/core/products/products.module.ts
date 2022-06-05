import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexProductComponent } from './pages/index-product/index-product.component';
import { RouterModule } from '@angular/router';
import { DetailsProductComponent } from './pages/details-product/details-product.component';
import { SanitizingPipe } from 'src/app/pipes/sanitizing.pipe';
import { CartProductComponent } from './pages/cart-product/cart-product.component';
import { DiscountsPipe } from 'src/app/pipes/discounts.pipe';

@NgModule({
  declarations: [
    IndexProductComponent,
    DetailsProductComponent,
    DiscountsPipe,
    SanitizingPipe,
    CartProductComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class ProductsModule {}
