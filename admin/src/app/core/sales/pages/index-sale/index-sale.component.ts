import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
})
export class IndexSaleComponent implements OnInit {
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
        console.log(this.sales);
        
      },
    });
  }

  filter() {
    this.saleService.get_sales_admin(this.from, this.to).subscribe({
      next: (res) => {
        this.sales = res.data;
      },
    });
  }
}
