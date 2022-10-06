import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Beer, Hops, Malt } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

interface NodeData {
  name: string;
  children?: NodeData[];
}

type NodeChildData = Hops | Malt;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  beerId!: number;
  beer!: Beer[];
  beerSubscription: Subscription | undefined;
  ingredientsData: NodeData[] | undefined;
  foodData: NodeData[] | undefined;
  tipsData: NodeData[] | undefined;
  cartSubscription: Subscription | undefined;
  isItemInCart = false;

  formatIngredientChildData(arr: NodeChildData[]) {
    let newArr = [
      ...arr.map((node: NodeChildData) => {
        return {
          name: `${node.name} ${node.amount.value} ${node.amount.unit}`,
        };
      }),
    ];
    return newArr;
  }

  formatFoodChildData(arr: string[]) {
    let newArr = [
      ...arr.map((node: string) => {
        return {
          name: node,
        };
      }),
    ];
    return newArr;
  }

  formatTipsChildData(data: any, type: string) {
    let newArr = [
      {
        name:
          type === 'Volume'
            ? `${type} is ${data.value} ${data.unit}`
            : `start ${type} at ${data.value}° ${data.unit}`,
      },
    ];
    return newArr;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.beerId = val['id'];
    });
    this.onGetBeerDetails();
    this.test();
  }

  test() {
    this.cartSubscription = this.cartService.cart.subscribe((_cart) => {
      this.isItemInCart = _cart.items.some((_item) => {
        return _item.beer.id === +this.beerId;
      });
    });
  }

  onAddToCart(): void {
    this.cartService.addToCart({
      beer: this.beer[0],
      quantity: 1,
    });
    this.test();
  }

  onRemoveFromCart(): void {
    this.cartService.removeFromCart(+this.beerId);
    this.test();
  }

  onGetBeerDetails() {
    this.beerSubscription = this.storeService
      .getBeerDetails(this.beerId)
      .subscribe((_beer) => {
        this.beer = _beer;
        console.log(this.beer);
        this.ingredientsData = [
          {
            name: 'Hops',
            children: this.formatIngredientChildData(_beer[0].ingredients.hops),
          },
          {
            name: 'Malt',
            children: this.formatIngredientChildData(_beer[0].ingredients.malt),
          },
        ];
        this.tipsData = [
          {
            name: 'Fermentation',
            children: this.formatTipsChildData(
              _beer[0].method.fermentation.temp,
              'Fermentation'
            ),
          },
          {
            name: 'Mashing',
            children: this.formatTipsChildData(
              _beer[0].method.mash_temp[0].temp,
              'Mashing'
            ),
          },
          {
            name: 'Volume',
            children: this.formatTipsChildData(_beer[0].volume, 'Volume'),
          },
        ];
        this.foodData = [
          {
            name: 'Foods',
            children: this.formatFoodChildData(_beer[0].food_pairing),
          },
        ];
      });
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
