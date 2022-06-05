import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  public path_product = environment.url_img_product;
  public path_category = environment.url_img_category;
  public path_discount = environment.url_img_discount;

  public categories: Array<any> = [];
  public new_products: Array<any> = [];
  public sales_products: Array<any> = [];
  public discounts: any = undefined;
  public discount: number = 1;

  constructor(
    private publicService: PublicService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.publicService.init_menu();
    this.get_discount();
    this.get_categories();
    this.get_new_products();
    this.get_sales_products();
  }

  get_discount() {
    this.productService.get_discount_active().subscribe({
      next: (res) => {
        if (res.data) {
          this.discounts = res.data[0];
          this.discount = 1 - this.discounts.discount / 100;
        } else {
          this.discounts = undefined;
          this.discount = 1;
        }
      },
    });
  }

  get_categories() {
    this.productService.list_categories('').subscribe(({ data }) => {
      this.categories = data;
    });
  }

  get_new_products() {
    this.productService.list_product_news().subscribe(({ data }) => {
      this.new_products = data;
    });
  }

  get_sales_products() {
    this.productService.list_product_sales().subscribe(({ data }) => {
      this.sales_products = data;
    });
  }
}
