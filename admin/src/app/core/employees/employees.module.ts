import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexEmployeeComponent } from './pages/index-employee/index-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';

@NgModule({
  declarations: [
    IndexEmployeeComponent,
    UpdateEmployeeComponent,
    CreateEmployeeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class EmployeesModule {}
