import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-variety-product',
  templateUrl: './variety-product.component.html',
  styles: ['th,td { text-align: center}'],
})
export class VarietyProductComponent implements OnInit {
  public path = environment.url_img_product;
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public product: any = {};
  public new_variety: string = '';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  init_data() {
    this.productService.read_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.product = res.data;
          this.load_data = false;
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
      error: (err) => console.log(err),
    });
  }

  add_variety() {
    if (this.new_variety) {
      this.product.items_variety.push({
        name: this.new_variety,
      });
      this.new_variety = '';
    } else {
      Swal.fire('Ups!', 'El campo de la variedad es obligatorio.', 'error');
    }
  }

  delete_variety(id: any) {
    this.product.items_variety.splice(id, 1);
  }

  default_items(type: string) {
    this.product.items_variety = [];
    if (type === 'clothes') {
      this.product.title_variety = 'Tallas';
      this.product.items_variety.push(
        { name: 'XS' },
        { name: 'S' },
        { name: 'M' },
        { name: 'L' },
        { name: 'XL' }
      );
    } else if (type === 'pants') {
      this.product.title_variety = 'Tallas';
      this.product.items_variety.push(
        { name: '26' },
        { name: '28' },
        { name: '30' },
        { name: '32' },
        { name: '34' }
      );
    } else if (type === 'shoes') {
      this.product.title_variety = 'Tallas';
      this.product.items_variety.push(
        { name: '39' },
        { name: '40' },
        { name: '41' },
        { name: '42' },
        { name: '43' }
      );
    } else {
      this.product.title_variety = '';
      this.product.items_variety = [];
    }
  }

  save() {
    if (this.product.title_variety) {
      if (this.product.items_variety.length > 0) {
        this.load_btn = true;
        const data = {
          title_variety: this.product.title_variety,
          items_variety: this.product.items_variety,
        };
        this.productService.change_variety(this.id, data).subscribe({
          next: (res) => {
            this.load_btn = false;
            Swal.fire('OK!', 'Datos guardados', 'success');
          },
        });
      } else {
        Swal.fire('Ups!', 'Se debe agregar como mínimo un item.', 'error');
      }
    } else {
      Swal.fire('Ups!', 'Se debe ingresar el nombre de una variedad.', 'error');
    }
  }

  validate(name: string) {
    //const input = this.myForm.controls[name];
    //return input.errors && input.touched;
  }
}
