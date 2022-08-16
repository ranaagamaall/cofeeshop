import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { HttpClient } from '@angular/common/http';
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
    this.myHTTP.get(this.myURL).subscribe((response: any) => {
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
