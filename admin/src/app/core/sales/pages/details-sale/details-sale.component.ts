import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-sale',
  templateUrl: './details-sale.component.html',
  styles: ['th,td { text-align: center; vertical-align: middle}'],
})
export class DetailsSaleComponent implements OnInit {
  public path = environment.url_img_product;
  public id: any;
  public order: any = {};
  public details: Array<any> = [];
  public load_data = true;

  constructor(
    private saleService: SaleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  init_data() {
    this.saleService.read_orders_detail(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.order = res.data;
          this.details = res.details;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/sales');
        }
      },
    });
  }
}
