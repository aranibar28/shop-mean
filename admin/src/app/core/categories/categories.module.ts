import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexCategoryComponent } from './pages/index-category/index-category.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';

@NgModule({
  declarations: [
    IndexCategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class CategoriesModule {}
