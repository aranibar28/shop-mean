import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTinymceModule } from 'ngx-tinymce';
import { SwiperModule } from 'swiper/angular';

import { IndexProductComponent } from './pages/index-product/index-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { InventoryProductComponent } from './pages/inventory-product/inventory-product.component';
import { GaleryProductComponent } from './pages/galery-product/galery-product.component';
import { VarietyProductComponent } from './pages/variety-product/variety-product.component';
import { ReviewsProductComponent } from './pages/reviews-product/reviews-product.component';

@NgModule({
  declarations: [
    IndexProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    InventoryProductComponent,
    GaleryProductComponent,
    VarietyProductComponent,
    ReviewsProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.4/',
    }),
  ],
})
export class ProductsModule {}
