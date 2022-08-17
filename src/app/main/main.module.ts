import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main.component';
import { MenuModule } from './menu/menu.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';

>>>>>>> 8a0470c8bf74b14568f2c7818d71191dac251e5b




@NgModule({
  declarations: [NavbarComponent, 
  MainComponent, HomeComponent],
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
