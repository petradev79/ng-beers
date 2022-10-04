import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Beer } from 'src/app/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() beer: Beer | undefined;
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.addToCart.emit(this.beer);
  }
}
