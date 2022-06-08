import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PublicService } from 'src/app/services/public.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { AddressService } from 'src/app/services/address.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
declare var paypal: any;

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
})
export class CartProductComponent implements OnInit {
  @ViewChild('paypalButton', { static: true }) paypalElement!: ElementRef;
  @ViewChild('myForm') myForm!: NgForm;
  public path = environment.url_img_product;
  public socket = io(environment.server);
  public principal_address: any = {};
  public cart_items: Array<any> = [];
  public delivery: Array<any> = [];
  public price_delivery = 0;
  public quantity = 0;
  public subtotal = 0;
  public total = 0;

  public sale: any = {};
  public detail: any = [];
  public id = localStorage.getItem('x-id'); // <-- id cliente
  public user = JSON.parse(localStorage.getItem('x-user')!); // <- data cliente

  public load_data = true;
  public load_btn = false;
  public status = false;
  public card_data: any = {};
  public error_message = '';
  public success_message = '';
  public active: any = undefined;
  public value_cupon = 0;

  constructor(
    private publicService: PublicService,
    private addressService: AddressService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.init_discount();
    this.init_data();
    this.init_paypal();
    this.init_delivery();
    this.init_address();
    this.publicService.init_payment_assets();
  }

  init_discount() {
    this.productService.get_discount_active().subscribe({
      next: (res) => {
        if (res.data) {
          this.active = res.data[0];
        } else {
          this.active = undefined;
        }
      },
    });
  }

  init_data() {
    this.cartService.get_cart_customer(this.id).subscribe({
      next: (res) => {
        this.cart_items = res.data;
        this.detail = [];
        this.cart_items.forEach((element) => {
          this.detail.push({
            customer: this.id,
            product: element.product._id,
            subtotal: element.product.price,
            quantity: element.quantity,
            variety: element.variety,
          });
        });
        this.load_data = false;
        this.calculate_cart();
        this.calculate_total('Envío Gratis');
      },
    });
  }

  init_delivery() {
    this.publicService.get_delivery().subscribe({
      next: (res) => (this.delivery = res),
    });
  }

  init_address() {
    this.addressService.principal_address(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.principal_address = res.data;
          this.sale.customer = this.id; // Mandar ID usuario
          this.sale.address = this.principal_address._id; // Mandar ID dirección
        } else {
          this.principal_address = undefined;
        }
      },
    });
  }

  calculate_cart() {
    this.subtotal = 0;
    if (!this.active) {
      this.cart_items.forEach((e) => {
        this.quantity = e.quantity;
        this.subtotal = this.subtotal + e.product.price * e.quantity;
      });
    } else {
      this.sale.discount = 1 - this.active.discount / 100;
      this.cart_items.forEach((e) => {
        this.quantity = e.quantity;
        let new_price = e.product.price * (1 - this.active.discount / 100);
        this.subtotal = this.subtotal + new_price * e.quantity;
      });
    }
  }

  calculate_total(type_delivery: any) {
    this.value_cupon = 0;
    this.total = this.subtotal + this.price_delivery;
    this.sale.type_delivery = type_delivery;
    this.sale.price_delivery = this.price_delivery;
    this.sale.subtotal = this.subtotal;
  }

  validate_coupon() {
    if (this.sale.coupon) {
      if (this.sale.coupon.toString().length <= 25) {
        this.error_message = '';
        this.success_message = '';
        this.cartService.validate_coupon(this.sale.coupon).subscribe({
          next: (res) => {
            if (res.data) {
              this.error_message = '';
              if (this.status == true) {
                return;
              }
              if (res.data.type == 'Valor Fijo') {
                this.status = true;
                this.value_cupon = res.data.value;
                this.total = this.total - this.value_cupon;
                this.success_message =
                  'Se ha aplicado un cupón de S/. ' + this.value_cupon;
              } else if (res.data.type == 'Porcentaje') {
                this.status = true;
                this.value_cupon = (this.total * res.data.value) / 100;
                this.total = this.total - this.value_cupon;
                this.success_message =
                  'Se ha aplicado un cupón de ' + res.data.value + '%';
              }
            } else {
              this.status = false;
              this.success_message = '';
              this.error_message = 'El cupón no se pudo canjear.';
              this.calculate_total(this.sale.type_delivery);
            }
          },
        });
      } else {
        this.status = false;
        this.success_message = '';
        this.error_message = 'El cupón debe tener menos de 25 carácteres.';
        this.calculate_total(this.sale.type_delivery);
      }
    } else {
      this.status = false;
      this.success_message = '';
      this.error_message = 'El cupón no es válido.';
      this.calculate_total(this.sale.type_delivery);
    }
  }

  init_paypal() {
    paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          tagline: false,
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Paypal',
                amount: { currency_code: 'USD', value: this.total },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          const order_id = order.purchase_units[0].payments.captures[0].id;
          this.sale.transaction = order_id;
          this.sale.payment_method = 'Paypal';
          this.sale.details = this.detail;
          console.log(this.sale);
          this.cartService.register_sale(this.sale).subscribe({
            next: (res) => {
              this.cartService.send_email_sale(res.sale._id).subscribe({
                next: (res) => {
                  this.zone.run(() => this.router.navigateByUrl('/'));
                  this.socket.emit('delete-item-cart', { data: res.data });
                  this.publicService.success('Compra Exitosa con Paypal');
                },
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        onError: (err: any) => {},
        onCancel: function (data: any, actions: any) {},
      })
      .render(this.paypalElement.nativeElement);
  }

  //Visa	4111111111111111 09/2025 123
  init_culqi() {
    if (this.myForm.valid) {
      let expiration = this.card_data.exp.toString().split('/');

      let data = {
        card_number: this.card_data.ncard.toString().replace(/ /g, ''),
        cvv: this.card_data.cvc,
        expiration_month: expiration[0],
        expiration_year: expiration[1].substr(0, 4),
        email: this.user.email,
      };

      this.load_btn = true;

      this.cartService.get_token_culqi(data).subscribe({
        next: (res) => {
          let parteDecimal = this.total % 1;
          let parteEntera = this.total - parteDecimal;
          let total = parteEntera * 100 + parteDecimal;
          let charge = {
            amount: parseInt(total + ''),
            currency_code: 'PEN',
            email: this.user.email,
            source_id: res.id,
          };
          this.cartService.get_charge_culqi(charge).subscribe({
            next: (res) => {
              this.sale.transaction = res.id;
              this.sale.details = this.detail;
              this.sale.payment_method = 'Culqi';
              this.cartService.register_sale(this.sale).subscribe({
                next: (res) => {
                  this.load_btn = false;
                  this.cartService.send_email_sale(res.sale._id).subscribe({
                    next: (res) => {
                      this.router.navigateByUrl('/');
                      this.socket.emit('delete-item-cart', { data: res.data });
                      this.publicService.success('Compra Exitosa con Culqi');
                    },
                  });
                },
                error: (err) => {
                  this.load_btn = false;
                  console.log(err);
                },
              });
            },
          });
        },
        error: () => {
          this.load_btn = false;
          this.publicService.danger('Hubo un error al procesar su compra');
        },
      });
    } else {
      this.publicService.danger('Seleccione un método de pago.');
    }
  }

  delete_item(id: any) {
    this.cartService.delete_item_cart(id).subscribe({
      next: (res) => {
        this.init_data();
        this.socket.emit('delete-item-cart', { data: res.data });
        this.publicService.success('Se eliminó el producto del carrito.');
      },
    });
  }
}
