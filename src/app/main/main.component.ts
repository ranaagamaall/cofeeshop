import { Component, OnInit } from '@angular/core';
import { navData } from './navbar/navData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Menu : Array<navData> = [

    {header : 'Home',command : 'home', icon: "pi pi-home"},
    {header : 'Menu', command : 'menu',icon: "pi pi-list"}, 
    {header : 'Cart', command : 'cart', icon: "pi pi-shopping-cart"}, 
    {header : 'Profile',command : 'profile', icon: "pi pi-user"}
  ];

}
