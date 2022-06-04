import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexProductComponent implements OnInit {
  public path = environment.url_img_product;
  public products: Array<any> = [];
  public excel: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_excel() {
    this.products.forEach(
      ({ title, price, stock, category: { title: cat }, num_sales, created_at }) => {
        this.excel.push({ title, price, stock, cat, num_sales, created_at });
      }
    );
  }

  init_data() {
    this.productService.read_product(this.word).subscribe({
      next: (res) => {
        this.products = res.data;
        this.load_data = false;
        this.init_excel();
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Categoría',
      text: `¿Desea eliminar el producto ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete_product(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `Producto ${title} eliminado.`, 'success');
        });
      }
    });
  }

  change_status_product(id: any) {
    this.productService.change_status(id).subscribe({
      next: () => {
        this.init_data();
      },
    });
  }

  show_product(item: any) {
    Swal.fire({
      title: item.title,
      text: 'S/. ' + item.price,
      imageUrl: this.path + item.image,
      imageWidth: 400,
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.products.length === 0) {
      return;
    }
    this.init_data();
  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');

    worksheet.addRow(undefined);
    for (let x1 of this.excel) {
      let x2 = Object.keys(x1);

      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }

    let fname = 'Lista de Productos';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Precio', key: 'col2', width: 15 },
      { header: 'Stock', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
      { header: 'Fecha Creación', key: 'col6', width: 30 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + ' ' + new Date().toISOString().split('T')[0] + '.xlsx');
    });
  }
}
