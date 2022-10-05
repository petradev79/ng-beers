import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Beer } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  beerId!: number;
  beer: Beer | undefined;
  beerSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.beerId = val['id'];
    });
    this.onGetBeerDetails();
  }

  onGetBeerDetails() {
    this.beerSubscription = this.storeService
      .getBeerDetails(this.beerId)
      .subscribe((_beer) => {
        this.beer = _beer;
        console.log(this.beer);
      });
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
