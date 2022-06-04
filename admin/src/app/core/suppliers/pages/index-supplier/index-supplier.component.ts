import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-supplier',
  templateUrl: './index-supplier.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexSupplierComponent implements OnInit {
  public suppliers: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.supplierService.read_suppliers(this.word).subscribe({
      next: (res) => {
        this.suppliers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: `¿Desea eliminar el proveedor ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.delete_supplier(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `Proveedor ${title} eliminado.`, 'success');
        });
      }
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.suppliers.length === 0) {
      return;
    }
    this.init_data();
  }
}
