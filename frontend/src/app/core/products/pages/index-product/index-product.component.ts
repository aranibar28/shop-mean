import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from 'src/app/services/public.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
})
export class IndexProductComponent implements OnInit {
  public path = environment.url_img_product;
  public categories: Array<any> = [];
  public products: Array<any> = [];

  public params_category: any;
  public discount: any = undefined;

  public filter_category = '';
  public filter_product = '';
  public filter_cat_pro = 'all';
  public sort_by = 'default';

  public load_data = true;
  public quantity = 0;
  public size: number = 9;
  public p: number = 1;

  constructor(
    private publicService: PublicService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.publicService.slider();
    this.list_categories();
    this.list_products();
    this.list_products_by_params();
  }

  list_categories() {
    this.productService.list_categories('').subscribe({
      next: (res) => (this.categories = res.data),
    });
  }

  list_products() {
    this.productService.list_products(this.filter_product).subscribe({
      next: (res) => {
        this.products = res.data;
        this.quantity = res.total;
        this.filter_cat_pro = 'all';
        this.load_data = false;
        this.p = 1;
      },
    });
  }

  list_products_by_params() {
    this.activatedRoute.params.subscribe(({ category }) => {
      this.params_category = category;
      if (this.params_category) {
        this.productService.list_products('').subscribe({
          next: (res) => {
            this.load_data = false;
            this.products = res.data;
            this.products = this.products.filter(
              (item) =>
                item.category?.title.toLowerCase() === this.params_category
            );
          },
        });
      } else {
        this.list_products();
      }
    });
  }

  reset_products() {
    this.filter_product = '';
    this.filter_cat_pro = 'all';
    this.productService.list_products('').subscribe({
      next: (res) => {
        this.products = res.data;
        this.load_data = false;
      },
    });
  }

  search_price() {
    this.p = 1;
    this.filter_cat_pro = 'all';
    this.productService.list_products(this.filter_product).subscribe({
      next: (res) => {
        this.products = res.data;
        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());
        this.products = this.products.filter((item: any) => {
          return item.price >= min && item.price <= max;
        });
      },
    });
  }

  search_category() {
    if (this.filter_category) {
      var search = new RegExp(this.filter_category, 'i');
      this.categories = this.categories.filter((item: any) =>
        search.test(item.title)
      );
    } else {
      this.list_categories();
    }
  }

  search_by_category() {
    this.p = 1;
    if (this.filter_cat_pro == 'all') {
      this.list_products();
      this.load_data = false;
    } else {
      this.productService.list_products(this.filter_product).subscribe({
        next: (res) => {
          this.products = res.data;
          this.products = this.products.filter(
            (item) => item.category?.title == this.filter_cat_pro
          );
          this.load_data = false;
        },
      });
    }
  }

  order_by() {
    if (this.sort_by == 'default') {
      this.productService.list_products('').subscribe({
        next: (res) => {
          this.products = res.data;
          this.load_data = false;
        },
      });
    } else if (this.sort_by == 'popularity') {
      this.products.sort((a: any, b: any) => {
        if (a.num_sales < b.num_sales) {
          return 1;
        }
        if (a.num_sales > b.num_sales) {
          return -1;
        }
        return 0;
      });
    } else if (this.sort_by == 'max_min') {
      this.products.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    } else if (this.sort_by == 'min_max') {
      this.products.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    } else if (this.sort_by == 'az_title') {
      this.products.sort((a: any, b: any) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    } else if (this.sort_by == 'za_title') {
      this.products.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
    }
  }
}
