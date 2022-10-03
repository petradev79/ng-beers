import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Beer } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  page = '1';
  perPage = '25';
  beers: Beer[] | undefined;
  beerSubscription: Subscription | undefined;

  constructor(
    private storeService: StoreService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.onGetBeers();
  }

  onGetBeers(): void {
    this.beerSubscription = this.storeService
      .getBeers(this.page, this.perPage)
      .subscribe((beers) => {
        console.log(beers);
        this.beers = beers;
      });
  }

  onAddToCart(beer: Beer): void {
    this.cartService.addToCart({
      beer,
      quantity: 1,
    });
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
