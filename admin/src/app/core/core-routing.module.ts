import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CoreComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes').then((m) => m.ChildRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
