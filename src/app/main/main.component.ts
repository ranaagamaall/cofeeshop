import { Component, OnInit } from '@angular/core';
import { navData } from './navbar/navData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
      
  Menu : Array<navData> = []
  constructor() { 
  }
  
  ngOnInit(): void {
    let profile = '';
    let route = '';
    if(localStorage.getItem('accessToken'))
      {
        console.log(localStorage.getItem('accessToken'));
        profile = 'profile';
        route = 'profile';
      }
      else{
        console.log(localStorage.getItem('accessToken'));
        profile = 'login';
        route = '../login';
      }
    
      this.Menu = [
        {header : 'Home',command : 'home', icon: "pi pi-home"},
        {header : 'Menu', command : 'menu',icon: "pi pi-list"}, 
        {header : 'Cart', command : 'cart', icon: "pi pi-shopping-cart"}, 
        {header : profile ,command : route , icon: "pi pi-user"}
      ];
  }
  

}
