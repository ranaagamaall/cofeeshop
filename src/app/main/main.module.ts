import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main.component';
import { MenuModule } from './menu/menu.module';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [NavbarComponent, 
  MainComponent, HomeComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenuModule
  ],
  exports: [NavbarComponent,
    MainComponent]
})
export class MainModule { }