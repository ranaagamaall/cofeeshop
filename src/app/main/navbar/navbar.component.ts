import { Component, Input, OnInit } from '@angular/core';
import {navData} from './navData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  @Input()
  navItems : Array<navData>=[];


  ngOnInit(): void {
  }

  HandleClick(item: any){
    if(item.header === 'Log Out')
    {
      localStorage.removeItem("accessToken");
      this.router.navigate(['../../login'])
    }
    
  }


}
