import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    ApiService,
    UserService,
  ],
})
export class UserModule { }
