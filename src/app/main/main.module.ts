import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main.component';
import { MenuModule } from './menu/menu.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './Modal/modal/modal.component';





@NgModule({
  declarations: [NavbarComponent, 
  MainComponent, HomeComponent, ModalComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenuModule,
    ButtonModule
  ],
  exports: [NavbarComponent,
    MainComponent]
})
export class MainModule { }
