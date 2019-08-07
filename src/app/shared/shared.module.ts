import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  PaginatorComponent,
  DataTableComponent,
} from './components';

@NgModule({
  declarations: [
    ButtonComponent,
    PaginatorComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    PaginatorComponent,
    DataTableComponent,
  ]
})
export class SharedModule { }
