import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/core/suppliers/services/supplier.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
  styles: ['th,td { text-align: center}'],
})
export class InventoryProductComponent implements OnInit {
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public inventories: Array<any> = [];
  public suppliers: Array<any> = [];
  public excel: Array<any> = [];
  public inventory: any = {};
  public product: any = {};
  public p: number = 1;
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.supplierService.read_suppliers('').subscribe(({ data }) => {
      this.suppliers = data;
    });
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    quantity: [, [Validators.required, Validators.minLength(3)]],
    supplier: ['', [Validators.required]],
  });

  init_excel() {
    // TODO: Fix supplier if company = null
    this.inventories.forEach(
      ({ created_by: { email }, quantity, supplier, created_at }) => {
        this.excel.push({ email, quantity, supplier, created_at });
      }
    );
  }

  init_data() {
    this.productService.read_product_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.product = res.data;
          this.productService.read_inventory(this.product._id).subscribe({
            next: (res) => {
              this.inventories = res.data;
              this.load_data = false;
              this.init_excel();
            },
            error: (err) => console.log(err),
          });
        } else {
          this.router.navigateByUrl('/dashboard/productos');
        }
      },
    });
  }

  registerInventory() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.load_btn = true;
    this.myForm.addControl('product', this.fb.control(this.product._id));
    this.productService.register_stock(this.myForm.value).subscribe({
      next: () => {
        this.productService.read_inventory(this.product._id).subscribe({
          next: (res) => {
            this.inventories = res.data;
            this.load_btn = false;
            this.myForm.controls['quantity'].reset();
            this.myForm.controls['supplier'].reset('');
            Swal.fire('Listo!', `Se registro correctamente.`, 'success');
          },
          error: (err) => {
            this.load_btn = false;
            console.log(err);
          },
        });
      },
      error: (err) => {
        this.load_btn = false;
        console.log(err);
      },
    });
  }

  delete_data(id: any, quantity: any) {
    Swal.fire({
      title: 'Retirar stock',
      text: `¿Desea retirar la cantidad de ${quantity} unidades?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.remove_stock(id).subscribe({
          next: () => {
            this.init_data();
          },
          error: (err) => console.log(err),
        });
        Swal.fire('Listo!', `Se actualizaron los cambios.`, 'success');
      }
    });
  }

  validate(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
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

    let fname = `Inventario de ${this.product.title}`;

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'Cantidad', key: 'col2', width: 15 },
      { header: 'Proveedor', key: 'col3', width: 25 },
      { header: 'Fecha Creación', key: 'col6', width: 30 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        fname + ' ' + new Date().toISOString().split('T')[0] + '.xlsx'
      );
    });
  }
}
