import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './account/pages/main/main.component';
import { MessagesComponent } from './account/pages/messages/messages.component';
import { ProfileComponent } from './account/pages/profile/profile.component';
import { SettingsComponent } from './account/pages/settings/settings.component';

import { IndexEmployeeComponent } from './employees/pages/index-employee/index-employee.component';
import { CreateEmployeeComponent } from './employees/pages/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employees/pages/update-employee/update-employee.component';

import { CreateCustomerComponent } from './customers/pages/create-customer/create-customer.component';
import { IndexCustomerComponent } from './customers/pages/index-customer/index-customer.component';
import { UpdateCustomerComponent } from './customers/pages/update-customer/update-customer.component';

import { CreateCategoryComponent } from './categories/pages/create-category/create-category.component';
import { IndexCategoryComponent } from './categories/pages/index-category/index-category.component';
import { UpdateCategoryComponent } from './categories/pages/update-category/update-category.component';

import { CreateProductComponent } from './products/pages/create-product/create-product.component';
import { IndexProductComponent } from './products/pages/index-product/index-product.component';
import { UpdateProductComponent } from './products/pages/update-product/update-product.component';
import { InventoryProductComponent } from './products/pages/inventory-product/inventory-product.component';
import { VarietyProductComponent } from './products/pages/variety-product/variety-product.component';
import { GaleryProductComponent } from './products/pages/galery-product/galery-product.component';
import { ReviewsProductComponent } from './products/pages/reviews-product/reviews-product.component';

import { IndexSupplierComponent } from './suppliers/pages/index-supplier/index-supplier.component';
import { CreateSupplierComponent } from './suppliers/pages/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from './suppliers/pages/update-supplier/update-supplier.component';

import { IndexCouponComponent } from './coupons/pages/index-coupon/index-coupon.component';
import { CreateCouponComponent } from './coupons/pages/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './coupons/pages/update-coupon/update-coupon.component';

import { IndexDiscountComponent } from './discounts/pages/index-discount/index-discount.component';
import { CreateDiscountComponent } from './discounts/pages/create-discount/create-discount.component';
import { UpdateDiscountComponent } from './discounts/pages/update-discount/update-discount.component';

const childRoutes: Routes = [
  { path: '', component: MainComponent, data: { title: 'Dashboard' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
  { path: 'messages', component: MessagesComponent, data: { title: 'Mensajes' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Configuración' } },

  { path: 'employees', component: IndexEmployeeComponent, data: { title: 'Empleados' } },
  { path: 'employees/create', component: CreateEmployeeComponent, data: { title: 'Empleados' } },
  { path: 'employees/update/:id', component: UpdateEmployeeComponent, data: { title: 'Empleados' } },

  { path: 'customers', component: IndexCustomerComponent, data: { title: 'Clientes' } },
  { path: 'customers/create', component: CreateCustomerComponent, data: { title: 'Clientes' } },
  { path: 'customers/update/:id', component: UpdateCustomerComponent, data: { title: 'Clientes' } },

  { path: 'categories', component: IndexCategoryComponent, data: { title: 'Categorias' } },
  { path: 'categories/create', component: CreateCategoryComponent, data: { title: 'Categorias' } },
  { path: 'categories/update/:id', component: UpdateCategoryComponent , data: { title: 'Categorias' }},

  { path: 'products', component: IndexProductComponent, data: { title: 'Productos' } },
  { path: 'products/create', component: CreateProductComponent, data: { title: 'Productos' } },
  { path: 'products/update/:id', component: UpdateProductComponent , data: { title: 'Productos' }},
  { path: 'products/inventory/:id', component: InventoryProductComponent , data: { title: 'Productos' }},
  { path: 'products/variety/:id', component: VarietyProductComponent , data: { title: 'Productos' }},
  { path: 'products/galery/:id', component: GaleryProductComponent , data: { title: 'Productos' }},
  { path: 'products/reviews/:id', component: ReviewsProductComponent , data: { title: 'Productos' }},

  { path: 'suppliers', component: IndexSupplierComponent, data: { title: 'Proveedor' } },
  { path: 'suppliers/create', component: CreateSupplierComponent, data: { title: 'Proveedor' } },
  { path: 'suppliers/update/:id', component: UpdateSupplierComponent , data: { title: 'Proveedor' }},

  { path: 'coupons', component: IndexCouponComponent, data: { title: 'Cupones' } },
  { path: 'coupons/create', component: CreateCouponComponent, data: { title: 'Cupones' } },
  { path: 'coupons/update/:id', component: UpdateCouponComponent , data: { title: 'Cupones' }},

  { path: 'discounts', component: IndexDiscountComponent, data: { title: 'Descuentos' } },
  { path: 'discounts/create', component: CreateDiscountComponent, data: { title: 'Descuentos' } },
  { path: 'discounts/update/:id', component: UpdateDiscountComponent , data: { title: 'Descuentos' }},
  { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
