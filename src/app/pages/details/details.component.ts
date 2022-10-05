import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { Beer, Hops, Ingredients } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  beerId!: number;
  beer: Beer[] | undefined;
  beerSubscription: Subscription | undefined;
  TREE_DATA: FoodNode[] = [];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    // this.dataSource.data = this.TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

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
        this.dataSource.data = [
          {
            name: 'Hops',
            children: _beer[0].ingredients.hops,
          },
          {
            name: 'Malt',
            children: _beer[0].ingredients.malt,
          },
        ];
        console.log(this.dataSource.data);
      });
  }

  ngOnDestroy(): void {
    if (this.beerSubscription) {
      this.beerSubscription.unsubscribe();
    }
  }
}
