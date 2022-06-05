import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../services/discount.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-discount',
  templateUrl: './index-discount.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexDiscountComponent implements OnInit {
  public path = environment.url_img_discount;
  public discounts: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.discountService.read_discounts(this.word).subscribe({
      next: (res) => {
        this.discounts = res.data;
        this.discounts.forEach((element) => {
          var start = Date.parse(element.start_date + 'T00:00:00') / 1000;
          var finish = Date.parse(element.finish_date + 'T00:00:00') / 1000;
          var today = Date.parse(new Date().toString()) / 1000;
          element.status = today > start ? 'Expirado' : 'Proximamente';
          if (today >= start && today <= finish) {
            element.status = 'En progreso';
          }
        });
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Descuento',
      text: `¿Desea eliminar el descuento ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.discountService.delete_discount(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `Descuento ${title} eliminado.`, 'success');
        });
      }
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.discounts.length === 0) {
      return;
    }
    this.init_data();
  }
}
