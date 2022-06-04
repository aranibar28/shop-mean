import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import SwiperCore, { SwiperOptions, Thumbs } from 'swiper';
import Swal from 'sweetalert2';
import 'swiper/css';
declare var $: any;

@Component({
  selector: 'app-galery-product',
  templateUrl: './galery-product.component.html',
})
export class GaleryProductComponent implements OnInit {
  public path = environment.url_img_product;
  public load_btn_image: boolean = false;
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public product: any = {};
  public file: File | undefined;
  public url: string = '';
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
    });
  }

  public config: SwiperOptions = {
    freeMode: true,
    pagination: { clickable: true },
    breakpoints: {
      '480': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '640': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  };

  fileChanged(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.file = undefined;
    } else {
      if (file.size <= 4000000) {
        const array = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (array.includes(file.type)) {
          this.file = file;
        } else {
          this.file = undefined;
          $('#input-img').val('');
          Swal.fire('Ups!', 'El archivo debe ser una imagen.', 'error');
        }
      } else {
        this.file = undefined;
        $('#input-img').val('');
        Swal.fire('Ups!', 'La imagen no puede superar los 4MB.', 'error');
      }
    }
  }

  add_image() {
    if (this.file) {
      let data = {
        _id: uuidv4(),
        image: this.file,
      };
      this.productService.add_items_galery(this.id, data).subscribe({
        next: () => {
          this.file = undefined;
          $('#input-img').val('');
          this.init_data();
          Swal.fire('Ok!', 'Imagen agregada.', 'success');
        },
        error: (err) => console.log(err),
      });
    } else {
      Swal.fire('Ups!', 'Debe seleccionar una imagen.', 'error');
    }
  }

  del_image(id: any, image: any) {
    Swal.fire({
      title: 'Eliminar Imagen',
      text: `¿Desea eliminar esta imagen?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_btn_image = true;
        this.productService
          .del_items_galery(this.id, { _id: id, image })
          .subscribe(() => {
            this.init_data();
            this.load_btn_image = false;
            Swal.fire('Ok!', 'Imagen eliminada.', 'success');
          });
      }
    });
  }
}
