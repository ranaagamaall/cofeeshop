import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SignupService } from './../../services/signup.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  constructor(
    private myHTTP: HttpClient,
    private service: UserService,
    private msgService: MessageService,
    private router:Router,
    private signupservice: SignupService
  ) {}

  usersList: any[] = [];

  private myURL = 'http://localhost:3000/users';

  ngOnInit(): void {
    /*this.myHTTP.get(this.myURL).subscribe((response: any) => {
      console.log(response);
      this.usersList = response;
    });*/
  }

  onSubmit(f: NgForm) {
    if(!f.value.email || !f.value.password || !f.value.fullName || !f.value.pass2)
    {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill all fields',
      });
    }
    /*else if(this.checkIfUserAlreadyExists(f.value.email))
    {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'There is an existing account with this email. Did you mean to login?',
      });
    }*/
    else if(!this.validateEmail(f.value.email))
    {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid email format',
      });
    }
    else if (f.value.password === f.value.pass2) 
    {
        delete f.value.pass2;
        /*this.service
          .create(f.value)
          .subscribe((data) => this.usersList.push(data));*/
          this.myHTTP.post('https://coffee-shop-backend-rb8i.onrender.com/api/authentication/create',f.value)
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error)=>{
              if(error instanceof HttpErrorResponse && error.status === 400){
                this.msgService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error.error,
                });
                console.log(error.error);
              }
              if(error.error.text === "User registered successfully!")
              {
                setTimeout(()=>{
                  this.router.navigate(['../login']);
                },3000);
                this.msgService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: `${error.error.text}. You will be redirected to login shortly`,
                });
              }
            }
          )
    } 
    else if (f.value.password !== f.value.pass2) {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Password Mismatch',
        });
    }
  }

   validateEmail(input:String) {
  
    if (input.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
    {
      return true;
    } else 
    {
      return false;
    }
  
  }

  /*checkIfUserAlreadyExists(email:string)
  {
    for(let user of this.usersList)
    {
      if(user.email === email)
        return true;
    }
    return false;
  }*/

}
