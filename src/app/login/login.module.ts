import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { RouterModule } from '@angular/router';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ToastModule, 
    RouterModule
  ]
})
export class LoginModule { }
