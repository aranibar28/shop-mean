import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../auth/pages/login/login.component';
import { RegisterComponent } from '../auth/pages/register/register.component';
import { IndexComponent } from './index/index.component';

import { AccountComponent } from './account/account.component';
import { AddressComponent } from './account/pages/address/address.component';
import { ProfileComponent } from './account/pages/profile/profile.component';

import { IndexProductComponent } from './products/pages/index-product/index-product.component';
import { DetailsProductComponent } from './products/pages/details-product/details-product.component';
import { CartProductComponent } from './products/pages/cart-product/cart-product.component';

const childRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'address', component: AddressComponent },
      { path: '**', redirectTo: 'profile' },
    ],
  },
  { path: 'cart', canActivate: [AuthGuard], component: CartProductComponent },
  { path: 'products', component: IndexProductComponent },
  { path: 'products/category/:category', component: IndexProductComponent },
  { path: 'products/:slug', component: DetailsProductComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
