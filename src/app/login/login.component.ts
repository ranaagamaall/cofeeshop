import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userData } from './userData';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  usersList: userData[] = [];
  email: string = ''; //saves login info of the current user
  password: string = '';
  correctPassword: boolean = false;
  exsistingUser: boolean = false;

  private myURL = 'http://localhost:3000/users';

  constructor(
    private myHTTP: HttpClient,
    private msgService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*this.myHTTP.get(this.myURL).subscribe((response: any) => {
      console.log(response);
      this.usersList = response;
    });*/
  }

  handleLogin() {
    
    /*for (let user of this.usersList) {
      if (user.email === this.email) {
        this.exsistingUser=true;
        if (user.password === this.password) {
          this.correctPassword = true;
          this.router.navigate(['../main']);
          console.log(this.router.url);        }
        }
      }*/
      
      if (!this.email || !this.password) {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Fill all fields',
        });
      }
      else
      {
      let data = {
        email: this.email,
        password: this.password,
      };
  
      this.myHTTP
        .post(
          'https://coffee-menu123.herokuapp.com/api/authentication/login',
          data
        )
        .subscribe(
          (response) => {
            let data = JSON.stringify(response);
            let data2 = data.split(':');
            let accessToken = data2[data2.length - 1];
            accessToken = accessToken.slice(1,accessToken.length - 2);
            localStorage.setItem('accessToken',accessToken);
            this.router.navigate(['../main']);
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.msgService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'No existing account for this user',
                });
              }
              console.log(error);
            }
          }
        );
    }
    /*else if (!this.exsistingUser && !this.correctPassword)
    {      
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No existing account for this user'
      });
    }
    else if (!this.correctPassword && this.exsistingUser) {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid email or password'
      });
    }*/
  }

  handleSignup() {
    this.router.navigate(['signup']);
  }
}
