import { Component, Input, OnInit } from '@angular/core';

import { Cart } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  itemsQuantity = 0;
  private _cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  getTotal() {}

  onClearCart() {}
}