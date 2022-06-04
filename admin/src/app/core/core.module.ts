import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AccountModule } from './account/account.module';
import { EmployeesModule } from './employees/employees.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CouponsModule } from './coupons/coupons.module';
import { DiscountsModule } from './discounts/discounts.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    AccountModule,
    EmployeesModule,
    CustomersModule,
    SuppliersModule,
    CategoriesModule,
    ProductsModule,
    CouponsModule,
    DiscountsModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ],
  exports: [CoreComponent],
})
export class CoreModule {}
