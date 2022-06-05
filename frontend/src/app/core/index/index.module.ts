import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [BrowserModule, CommonModule, RouterModule],
})
export class IndexModule {}
