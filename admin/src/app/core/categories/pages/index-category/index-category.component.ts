import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styles: ['th,td { text-align: center}'],
})
export class IndexCategoryComponent implements OnInit {
  public path = environment.url_img_category;
  public categories: Array<any> = [];
  public load_data: boolean = true;
  public word: string = '';
  public p: number = 1;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.categoryService.read_category(this.word).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.load_data = false;
      },
      error: (err) => console.log(err),
    });
  }

  delete_data(id: any, title: any) {
    Swal.fire({
      title: 'Eliminar Categoría',
      text: `¿Desea eliminar la categoría ${title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete_category(id).subscribe(() => {
          this.init_data();
          Swal.fire('Listo!', `Categoría ${title} eliminado.`, 'success');
        });
      }
    });
  }

  filter() {
    if (this.word.length === 0) {
      this.init_data();
      return;
    }
    if (this.categories.length === 0) {
      return;
    }
    this.init_data();
  }
}
