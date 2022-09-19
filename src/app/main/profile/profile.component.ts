import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fullname:string = '';
  email:string = '';

  constructor(
    private myHTTP: HttpClient,
    private router:Router
  ) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  });

  requestOptions = { headers: this.headers };

  ngOnInit(){
    this.myHTTP
      .get(
        `https://coffee-menu123.herokuapp.com/api/user/byToken/${localStorage.getItem('accessToken')}`,
        this.requestOptions
      )
      .subscribe((response: any) => {
        console.log(response);
        this.fullname = response.fullName;
        this.email = response.email;
      });
  }

  HandleClick(){
      localStorage.removeItem("accessToken");
      this.router.navigate(['../../login'])
  }

}
