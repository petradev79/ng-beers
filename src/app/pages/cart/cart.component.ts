import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cart, CartItem } from '../../models';
import { CartService } from '../../services/cart.service';
// import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  displayedColumns: string[] = [
    'image',
    'name',
    'alcohol',
    'quantity',
    'action',
  ];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
      console.log(this.dataSource);
    });
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    // this.http
    //   .post('http://localhost:4242/checkout', {
    //     items: this.cart.items,
    //   })
    //   .subscribe(async (res: any) => {
    //     let stripe = await loadStripe('your token');
    //     stripe?.redirectToCheckout({
    //       sessionId: res.id,
    //     });
    //   });
  }

  getTotal(items: CartItem[]) {
    // return this.cartService.getTotal(items);
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
