import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Beer } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() beer!: Beer;
  @Input() fullWidthMode = false;
  isItemInCart = false;
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart) => {
      this.isItemInCart = _cart.items.some(
        (_item) => _item.beer.id === this.beer!.id
      );
    });
  }

  onAddToCart(e: MouseEvent): void {
    e.stopPropagation();
    this.cartService.addToCart({
      beer: this.beer,
      quantity: 1,
    });
  }

  onGoToDetails() {
    this.router.navigate(['beer-details', this.beer.id]);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
