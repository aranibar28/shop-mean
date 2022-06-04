import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexCustomerComponent implements OnInit {
  public customers: Array<any> = [];
  public customer: any;
  public filter_firt_name: string = '';
  public filter_last_name: string = '';
  public filter_email: string = '';
  public load_data: boolean = true;
  public p: number = 1;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.customerService.read_customers(null, null).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter(type: any) {
    var filter;
    type === 'first_name' && (filter = this.filter_firt_name);
    type === 'last_name' && (filter = this.filter_last_name);
    type === 'email' && (filter = this.filter_email);

    this.customerService.read_customers(type, filter).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, name: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el usuario ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete_customer(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `El usuario ${name} fue eliminado.`, 'success');
        });
      }
    });
  }
}
