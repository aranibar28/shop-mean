import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, ContactComponent],
  imports: [BrowserModule, CommonModule, RouterModule, ReactiveFormsModule],
})
export class IndexModule {}
