import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Cart, CartItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.beer.id === item.beer.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem, updateCart = true) {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.beer.id !== item.beer.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this.snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }
}
