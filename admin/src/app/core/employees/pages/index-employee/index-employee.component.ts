import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-employee',
  templateUrl: './index-employee.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexEmployeeComponent implements OnInit {
  public customers: Array<any> = [];
  public customer: any;
  public filter_firt_name: string = '';
  public filter_last_name: string = '';
  public filter_email: string = '';
  public load_data: boolean = true;
  public p: number = 1;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.employeeService.read_users().subscribe({
      next: (res) => {
        this.customers = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, name: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el usuario ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.delete_user(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `El usuario ${name} fue eliminado.`, 'success');
        });
      }
    });
  }
}
