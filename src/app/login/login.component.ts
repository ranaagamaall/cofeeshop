import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userData } from './userData';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:  [MessageService]
})
export class LoginComponent implements OnInit {
  usersList : userData[] = [];
  email : string ='';         //saves login info of the current user
  password : string ='';
  loggedIn : boolean = false;

  private myURL = 'http://localhost:3000/users';

  constructor(private myHTTP : HttpClient,  
    private msgService: MessageService,
    private router : Router) { }

  ngOnInit(): void {
    this.myHTTP.get(this.myURL).subscribe((response:any) => {
      console.log(response);
      this.usersList = response;
    })
  }

  handleLogin(){
    for(let user of this.usersList){
      if(user.email === this.email){
        if(user.password === this.password){
          this.loggedIn = true;
        }
    }
    }
    if(!this.loggedIn){
      this.msgService.add({severity:'error', summary: 'Error', detail: 'Invalid email or password'});
    }
}

  handleSignup(){
    this.router.navigate(['signup']);
  }
}
