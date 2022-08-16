import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path: '**', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
