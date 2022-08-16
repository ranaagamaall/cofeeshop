import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends DataService {
  constructor(http: HttpClient) {
    super('https://coffee-menu123.herokuapp.com/api/authentication/create', http);
  }
}
