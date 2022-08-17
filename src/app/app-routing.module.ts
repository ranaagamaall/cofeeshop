import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { StayInMainWhenLoggedGuard } from './guards/stay-in-main-when-logged.guard';

const routes: Routes = [
  {path:'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate:[StayInMainWhenLoggedGuard]},
  {path:'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [LoginGuard] },
  {path:'**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
