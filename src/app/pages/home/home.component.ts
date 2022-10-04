import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Beer, Filter } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  perPage = '25';
  beers: Beer[] | undefined;
  beerSubscription: Subscription | undefined;
  filter: Filter | undefined;

  constructor(
    private storeService: StoreService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.onGetBeers();
  }

  onShowFilter(newFilter: Filter) {
    this.filter = newFilter;
    this.onGetBeers();
  }

  onClearFilter() {
    this.filter = undefined;
    this.onGetBeers();
  }

  onGetBeers(): void {
    this.beerSubscription = this.storeService
      .getBeers(this.perPage, this.filter)
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

  onItemsPerPageUpdated(numberPerPage: number) {
    this.perPage = numberPerPage.toString();
    this.onGetBeers();
  }

  onColumnsUpdated(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
