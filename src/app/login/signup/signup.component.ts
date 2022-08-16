import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers:[MessageService]
})
export class SignupComponent implements OnInit {

  constructor(private myHTTP : HttpClient, 
    private service: UserService, 
    private msgService: MessageService) { }

  usersList : any[] = [];

  private myURL = 'http://localhost:3000/users';

  ngOnInit(): void {
    this.myHTTP.get(this.myURL).subscribe((response:any) => {
      console.log(response);
      this.usersList = response;
    })
  }

  onSubmit(f: NgForm){
    if(!(f.valid)){
      this.msgService.add({severity:'error', summary: 'Error', detail: 'Invalid form data'});
    }else{
      if((f.value.password === f.value.pass2)){
        delete (f.value.pass2);
        this.service.create(f.value).subscribe( data => this.usersList.push(data));
      }
      else{
        this.msgService.add({severity:'error', summary: 'Error', detail: 'Password Mismatch'});
      }
    }

}
}
