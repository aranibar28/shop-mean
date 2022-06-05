import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public path = environment.url_img_product;
  public socket = io(environment.server);
  public id = localStorage.getItem('x-id');
  public user: any = undefined;
  public public_user: any = undefined;
  public categories: Array<any> = [];
  public active: any = undefined;
  public discount: number = 1;
  public op_cart = false;

  public cart_items: Array<any> = [];
  public subtotal = 0;

  constructor(
    private authService: AuthService,
    private publicService: PublicService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logged();
    this.list_categories();
    this.socket.on('new-item-cart', this.get_cart_customer.bind(this)); // agregar
    this.socket.on('update-item-cart', this.get_cart_customer.bind(this)); // eliminar
  }

  logged() {
    if (this.authService.user) {
      this.public_user = JSON.parse(localStorage.getItem('x-user')!);
      this.init_discount();
      this.get_cart_customer();
    } else {
      this.public_user = undefined;
    }
  }

  list_categories() {
    this.productService.list_categories('').subscribe({
      next: (res) => (this.categories = res.data),
    });
  }

  init_discount() {
    this.productService.get_discount_active().subscribe({
      next: (res) => {
        if (res.data) {
          this.active = res.data[0];
          this.discount = 1 - this.active.discount / 100;
        } else {
          this.active = undefined;
          this.discount = 1;
        }
      },
    });
  }

  get_cart_customer() {
    this.cartService.get_cart_customer(this.id).subscribe({
      next: (res) => {
        this.cart_items = res.data;
        this.calculate_cart();
      },
    });
  }

  calculate_cart() {
    this.subtotal = 0;
    if (!this.active) {
      this.cart_items.forEach((e) => {
        this.subtotal = this.subtotal + e.product.price * e.quantity;
      });
    } else {
      this.cart_items.forEach((e) => {
        let new_price = e.product.price * (1 - this.active.discount / 100);
        this.subtotal = this.subtotal + new_price * e.quantity;
      });
    }
  }

  delete_item(id: any) {
    this.cartService.delete_item_cart(id).subscribe({
      next: (res) => {
        this.socket.emit('delete-item-cart', { data: res.data });
        this.publicService.success('Se eliminó el producto del carrito.');
      },
    });
  }

  show_modal_cart() {
    if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
    } else {
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

  logout() {
    Swal.fire({
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/');
        window.location.reload();
      }
    });
  }
}
