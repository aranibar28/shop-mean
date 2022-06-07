import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexSaleComponent implements OnInit {
  public load_data: boolean = true;
  public sales: Array<any> = [];
  public from: any;
  public to: any;
  public p = 1;

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.saleService.get_sales_admin(this.from, this.to).subscribe({
      next: (res) => {
        this.sales = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  filter() {
    this.load_data = true;
    this.saleService.get_sales_admin(this.from, this.to).subscribe({
      next: (res) => {
        this.load_data = false;
        this.sales = res.data;
      },
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Cupón',
      text: `¿Desea eliminar el Cupón ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Listo!', `Cupón ${title} eliminado.`, 'success');
        /* this.couponService.delete_coupon(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `Cupón ${title} eliminado.`, 'success');
        }); */
      }
    });
  }
}
