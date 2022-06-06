import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews-product',
  templateUrl: './reviews-product.component.html',
})
export class ReviewsProductComponent implements OnInit {
  public path = environment.url_img_product;
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public reviews: Array<any> = [];
  public product: any = {};
  public id: any;
  public p = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.productService.read_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.product = res.data;
          this.productService.read_review_product(this.product._id).subscribe({
            next: (res) => (this.reviews = res.data),
          });
        } else {
          this.router.navigateByUrl('/dashboard/products');
        }
      },
    });
  }
}
