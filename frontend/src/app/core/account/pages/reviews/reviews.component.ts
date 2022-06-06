import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent implements OnInit {
  public path = environment.url_img_product;
  public id = localStorage.getItem('x-id'); // <-- id cliente
  public reviews: Array<any> = [];
  public load_data = true;
  public p: number = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.cartService.read_review_customer(this.id).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.load_data = false;
      },
    });
  }
}
