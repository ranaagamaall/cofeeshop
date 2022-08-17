import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { menuItem } from './menuItem';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <img [src]="name.image" class="imgForModal" />
      <div>
        <div>
          <h3 class="modal-title">{{ name.name }}</h3>
        </div>
        <div>
          <p>{{ name.description }}!</p>
        </div>
      </div>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <div class="sizeContainer">
        <div>
          <div>
            <h5>Item count</h5>
          </div>
          <div>
            <span>$</span>
            <span>{{ name.price }}</span>
          </div>
        </div>

        <div class="countControllers">
          <button icon="pi pi-minus" [disabled]= "this.disabled" type="button" class="p-button-outlined p-button-rounded p-button-warning p-button" (click)="dec()">
            -
          </button>
          <div>
            {{this.itemcount}}
          </div>
          <button icon="pi pi-plus" type="button" class="p-button-outlined p-button-rounded p-button-warning p-button" (click)="inc()">
            +
          </button>
        </div>
      </div>
      <div class="sizeContainer">
        <h5>Size</h5>
        <div class="Sizes">
          <img
            id="s"
            class="small"
            src="./assets/coffeecup"
            (click)="hover($event)"
          />
          <img
            id="m"
            class="medium"
            src="./assets/coffeecup"
            (click)="hover($event)"
          />
          <img
            id="l"
            class="large"
            src="./assets/coffeecup"
            (click)="hover($event)"
          />
        </div>
      </div>
      <div class="sizeContainer">
        <h5>Sugar</h5>
        <div class="Sizes">
          <img
            id="ns"
            class="large"
            src="./assets/nosugar"
            (click)="hoverSugar($event)"
          />
          <img
            id="ws"
            class="large"
            src="./assets/withsugar"
            (click)="hoverSugar($event)"
          />
        </div>
      </div>
      <div class="sizeContainer">
        <h5>Additions</h5>
        <div class="Sizes">
          <img
            id="caramel"
            class="large"
            src="./assets/caramel"
            (click)="hoverAdditions($event)"
          />
          <img
            id="milk"
            class="large"
            src="./assets/milk"
            (click)="hoverAdditions($event)"
          />
        </div>
      </div>
      <div class="sizeContainer">
        <h3>Total</h3>
      <h4 class="large" id="price"><span>$</span>{{this.tPrice}}</h4>
      
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="p-element p-ripple p-button-outlined p-button-rounded p-button-warning p-button p-component"
          (click)="activeModal.close('Close click')"
        >
          Add
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class NgbdModalContent implements OnInit {
  @Input() name: any;     //product element

  iPrice : number =0;      //initial price
  cPrice : number =0;     //cup price upon customization
  aPrice : number =0;     //addition price upon customization
  tPrice: number =0;      //accumulator for item price upon customization


  itemcount:number=1;

  disabled:boolean=false;


  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.iPrice = this.name.price;     //initialises the price with base price of the item
    // this.cPrice =this.iPrice;
    // this.cPrice =0;
  }
  
  hover(element: any) {
    let ids = ['s', 'm', 'l'];
    for (let id of ids) {
      this.unhover(document.getElementById(id), './assets/coffeecup');
    }
    element.srcElement.setAttribute('src', './assets/coffeecuphover');
    const elId : string =element.srcElement.getAttribute('id');
    
    if( elId == 'l'){
      this.cPrice = this.iPrice * 1.8;
      this.cPrice.toFixed(2);
    }
    else if( elId == 'm'){
      this.cPrice = this.iPrice * 1.4;
      this.cPrice.toFixed(2);
    }
    else{
      this.cPrice = this.iPrice;
    }
    this.tPrice = this.cPrice + this.aPrice;
  }

  inc(){
    this.itemcount++;
    this.disabled=false;
  }

  dec(){
    if(this.itemcount !== 1)
    {
      this.itemcount--;
    }
    if(this.itemcount === 1)
    {
      this.disabled=true;
    }
  }

  unhover(element: any, image: string) {
    element.setAttribute('src', image);
        
  }

  hoverSugar(element: any) {
    if (element.srcElement === document.getElementById('ns')) {
      this.unhover(document.getElementById('ws'), './assets/withsugar');
      element.srcElement.setAttribute('src', './assets/nosugarhover');
    } else {
      this.unhover(document.getElementById('ns'), './assets/nosugar');
      element.srcElement.setAttribute('src', './assets/withsugarhover');
        this.aPrice -= 0.5;
    }
  }

  hoverAdditions(element: any) {
    if (element.srcElement === document.getElementById('caramel')) {
      if (element.srcElement.src.endsWith('caramel')) {
        element.srcElement.setAttribute('src', './assets/caramelhover');
        this.aPrice += 0.5;
      } else {
        element.srcElement.setAttribute('src', './assets/caramel');
        this.aPrice -= 0.5;
      }
    } else {
      if (element.srcElement.src.endsWith('milk')) {
        element.srcElement.setAttribute('src', './assets/milkhover');
        this.aPrice += 1;
      } else {
        element.srcElement.setAttribute('src', './assets/milk');
        this.aPrice -= 1;
      }
    }
    this.tPrice = this.cPrice + this.aPrice;
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  defaultImage = '../../../assets/noImage.jpg';
  itemsList: menuItem[] = [];
  private myURL: string = 'http://localhost:3000/items';

  /*@Input() name: string = '';*/
  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  });

  requestOptions = { headers: this.headers };

  constructor(
    private myHTTP: HttpClient,
    private service: MenuService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.myHTTP
      .get(
        'https://coffee-menu123.herokuapp.com/api/products/all',
        this.requestOptions
      )
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
  open(id: number) {
    let product: menuItem[] = this.itemsList.filter(
      (product) => product.id === id
    );
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = product[0];

  }
}
