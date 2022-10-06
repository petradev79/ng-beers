import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cart, CartItem } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  displayedColumns: string[] = [
    'image',
    'name',
    'first_brewed',
    'alcohol',
    'bitterness',
    'color',
    'attenuation_level',
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
    });
  }

  onRemoveFromCart(id: number): void {
    this.cartService.removeFromCart(id);
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

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
