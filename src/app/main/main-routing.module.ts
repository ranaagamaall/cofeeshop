import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import {ProfileComponent} from './profile/profile.component'

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'menu', component: MenuComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'cart', component: CartComponent},
    {path: '**', redirectTo:'home'}
    ]}
  ]
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
