import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menu_items: any[] = [];

  constructor(private sidebarService: SidebarService) {
    this.menu_items = this.sidebarService.menu;
  }

  ngOnInit(): void {}
}
