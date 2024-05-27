import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from '../login/login.component'
import {ProfileComponent} from './profile/profile.component'

let profile = '';
let comp = null;
if(localStorage.getItem('accessToken'))
  {
    console.log(localStorage.getItem('accessToken'));
    profile = 'profile';
    comp = ProfileComponent;
  }
  else{
    console.log(localStorage.getItem('accessToken'));
    profile = 'login';
    comp = LoginComponent;
  }
const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'menu', component: MenuComponent},
    {path: 'home', component: HomeComponent},
    {path: profile, component: comp},
    {path: 'cart', component: CartComponent},
    {path: '**', redirectTo:'home'}
    ]}
  ]
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
