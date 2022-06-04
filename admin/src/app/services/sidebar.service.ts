import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [{ title: 'Panel', url: '/' }],
    },
    {
      title: 'Usuarios',
      icon: 'mdi mdi-account',
      submenu: [
        { title: 'Clientes', url: 'customers' },
        { title: 'Empleados', url: 'employees' },
      ],
    },
    {
      title: 'Suministros',
      icon: 'mdi mdi-grid',
      submenu: [
        { title: 'Proveedores', url: 'suppliers' },
        { title: 'Categorías', url: 'categories' },
        { title: 'Productos', url: 'products' },
      ],
    },
    {
      title: 'Descuentos',
      icon: 'mdi mdi-ticket-percent',
      submenu: [
        { title: 'Cupones', url: 'coupons' },
        { title: 'Descuentos', url: 'discounts' },
      ],
    },
  ];

  constructor() {}
}
