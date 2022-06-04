import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexSupplierComponent } from './pages/index-supplier/index-supplier.component';
import { CreateSupplierComponent } from './pages/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from './pages/update-supplier/update-supplier.component';

@NgModule({
  declarations: [
    IndexSupplierComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class SuppliersModule {}
