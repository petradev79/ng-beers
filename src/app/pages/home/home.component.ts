import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Beer, Filter } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  perPage = '25';
  beers: Beer[] | undefined;
  beerSubscription: Subscription | undefined;
  filter: Filter | undefined;
  sort = 'up';

  constructor(
    private storeService: StoreService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.onGetBeers();
  }

  sortedArray(arr: Beer[]) {
    if (this.sort === 'up') {
      return arr.sort((a, b) => a.abv - b.abv);
    } else {
      return arr.sort((a, b) => b.abv - a.abv);
    }
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
        this.beers = this.sortedArray(beers);
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

  onSortUpdated(newSort: string) {
    this.sort = newSort;
    this.onGetBeers();
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
