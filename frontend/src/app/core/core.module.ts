import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthModule } from '../auth/auth.module';
import { IndexModule } from './index/index.module';
import { AccountModule } from './account/account.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    AuthModule,
    AccountModule,
    IndexModule,
    ProductsModule,
    SharedModule,
    CoreRoutingModule,
  ],
})
export class CoreModule {}
