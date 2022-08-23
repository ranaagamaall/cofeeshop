import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { menuItem } from '../menu/menuItem';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  itemsList: any[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    let cartItems: any = localStorage.getItem('cart');
    if(cartItems)
    {
      this.itemsList = JSON.parse(cartItems);
      console.log(this.itemsList);
    }

    this.calcTotalPrice();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!totalPrice' },
      { label: 'Price Low to High', value: 'totalPrice' },
    ];
  }

  inc(item: any){
    item.totalPrice += (item.totalPrice /item.itemCount);
    item.totalPrice = Math.round(item.totalPrice * 10) / 10;
    item.itemCount++;

    this.calcTotalPrice();
    this.updateLocalStorage();
  }

  dec(item: any){
    if(item.itemCount)
    {
      item.totalPrice -= (item.totalPrice /item.itemCount);
      item.totalPrice = Math.round(item.totalPrice * 10) / 10;
      item.itemCount--;

      this.calcTotalPrice();
    }
    if(!item.itemCount)
    {
      let index = this.itemsList.indexOf(item);
      this.itemsList = this.itemsList.filter((item,i) => i !== index );
    }
    this.updateLocalStorage();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  calcTotalPrice() {
    this.total = 0;
    for(let item of this.itemsList)
    {
      this.total += item.totalPrice;
    }
    this.total = Math.round(this.total * 10) / 10;
  }

  updateLocalStorage() {
    localStorage.setItem('cart',JSON.stringify(this.itemsList));
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.itemsList = [];
    this.total = 0;
  }

}
