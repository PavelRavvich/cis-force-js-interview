import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  PaginatorComponent
} from './components';

@NgModule({
  declarations: [
    ButtonComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    PaginatorComponent,
  ]
})
export class SharedModule { }
