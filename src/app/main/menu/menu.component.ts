import { Component, OnInit , Input} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { menuItem } from './menuItem';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class MenuComponent implements OnInit {
  itemsList: menuItem[] = [];
  private myURL: string = 'http://localhost:3000/items';
  
  @Input() name:string='';
  sortOptions: SelectItem[] = [];
  
  sortOrder: number = 0;
  
  sortField: string = '';
  
  constructor(private myHTTP: HttpClient, private service: MenuService,public activeModal: NgbActiveModal) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    
    const requestOptions = { headers: headers };
    
    this.myHTTP
    .get('https://coffee-menu123.herokuapp.com/api/products/all', requestOptions)
    .subscribe((response: any) => {
      console.log(response);
      this.itemsList = response;
    });
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;
    
    console.log(event);
    
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    console.log(this.sortField);
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
