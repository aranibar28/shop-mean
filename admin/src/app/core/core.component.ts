import { Component, OnInit } from '@angular/core';
declare function customInitFunctions(): any;

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');

  constructor() {}

  ngOnInit(): void {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    // Esta función pertenece al 'custom.js' y sirve para inicialzar el tema de la plantilla.
    customInitFunctions();
  }
}
