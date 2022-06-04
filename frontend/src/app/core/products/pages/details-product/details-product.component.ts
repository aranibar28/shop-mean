import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
})
export class DetailsProductComponent implements OnInit, AfterViewInit {
  public path = environment.url_img_product;
  public socket = io(environment.server);
  public products_recomended: Array<any> = [];
  public discount: any = undefined;
  public product: any = {};
  public slug: any;

  public cart_data: any = { variety: '', quantity: 1 };
  public load_btn = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.list_product_by_slug();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.publicService.init_light_gallery();
    }, 1000);
  }

  list_product_by_slug() {
    this.activatedRoute.params.subscribe(({ slug }) => {
      this.slug = slug;
      this.productService.list_product_by_slug(this.slug).subscribe({
        next: (res) => {
          this.product = res.data;
          this.productService
            .list_product_recomended(this.product.category?._id)
            .subscribe({
              next: (res) => {
                this.products_recomended = res.data;
              },
            });
        },
      });
    });
  }

  add_product() {
    if (this.cart_data.variety) {
      if (this.cart_data.quantity <= this.product.stock) {
        let data = {
          product: this.product._id,
          customer: localStorage.getItem('x-id'),
          quantity: this.cart_data.quantity,
          variety: this.cart_data.variety,
        };
        this.load_btn = true;
        this.cartService.add_item_cart(data).subscribe({
          next: (res) => {
            if (res.data) {
              this.load_btn = false;
              this.socket.emit('insert-item-cart', { data: true });
              this.publicService.success('Se agegró el producto al carrito.');
            } else {
              this.load_btn = false;
              this.publicService.danger('El producto ya existe en el carrito.');
            }
          },
        });
      } else {
        const msg = 'La máxima cantidad disponible es ' + this.product.stock;
        this.publicService.danger(msg);
      }
    } else {
      const msg = 'Porfavor, seleccione una variedad del producto.';
      this.publicService.danger(msg);
    }
  }
}
