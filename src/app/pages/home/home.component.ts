import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Beer } from 'src/app/models';
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

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers(): void {
    this.beerSubscription = this.storeService
      .getAllBeers(this.page, this.perPage)
      .subscribe((beers) => {
        console.log(beers);
        this.beers = beers;
      });
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
