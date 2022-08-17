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
      <img [src]="name.image" class="imgForModal">
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
      <h5>Item Count</h5>
      </div>
      <div class="sizeContainer">
      <h5>Size</h5>
      </div>
      <div class="sizeContainer">
      <h5>Sugar</h5>
      </div>
      <div class="sizeContainer">
      <h5>Additions</h5>
      </div>
      <div>
      <h3>Total</h3>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Add
      </button>
    </div>
  `,
  styleUrls:['./menu.component.scss']
})
export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) {}
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
    console.log(product);

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = product[0];
  }
}
