import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { IndexSaleComponent } from './pages/index-sale/index-sale.component';
import { DetailsSaleComponent } from './pages/details-sale/details-sale.component';

@NgModule({
  declarations: [IndexSaleComponent, DetailsSaleComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class SalesModule {}
