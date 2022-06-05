import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  public messages: Array<any> = [];
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public word: string = '';
  public p: number = 1;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.profileService.get_messages_admin().subscribe({
      next: (res) => {
        this.load_data = false;
        this.messages = res.data;
      },
    });
  }

  close_asunt(id: any) {
    Swal.fire({
      title: 'Cerrar Mensaje ' + id,
      text: 'Desea cerrar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_btn = true;
        this.profileService
          .close_message_admin(id, { data: undefined })
          .subscribe({
            next: () => {
              this.init_data();
              this.load_btn = false;
              Swal.fire('Listo!', 'El mensaje a sido cerrado.', 'success');
            },
          });
      }
    });
  }
}
