import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Beer } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() beer: Beer | undefined;
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  isItemInCart = false;
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart) => {
      this.isItemInCart = _cart.items.some(
        (_item) => _item.beer.id === this.beer!.id
      );
    });
  }

  onClick() {
    this.addToCart.emit(this.beer);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
