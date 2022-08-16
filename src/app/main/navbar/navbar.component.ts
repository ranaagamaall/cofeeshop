import { Component, Input, OnInit } from '@angular/core';
import {navData} from './navData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input()
  navItems : Array<navData>=[];


  ngOnInit(): void {
  }

  HandleClick(item: any){
    for(let i = 0; i<(this.navItems.length); i++){
      this.navItems[i].IsActive = false;
    }
    item.IsActive=true;
    
  }


}
