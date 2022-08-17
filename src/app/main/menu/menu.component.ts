import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { menuItem } from './menuItem';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  itemsList: menuItem[] = [];
  private myURL: string = 'http://localhost:3000/items';

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  constructor(private myHTTP: HttpClient, private service: MenuService) {}

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
}
