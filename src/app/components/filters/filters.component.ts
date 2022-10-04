import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Filter, Filters } from 'src/app/models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  @Output() showFilter = new EventEmitter<Filter>();
  @Output() clearFilter = new EventEmitter();
  @ViewChild('list') list: any;
  filters: Filters = {
    malt: {
      title: 'maltFilters',
      maltFilters: [
        { name: 'malt', value: 'Lager_Malt', title: 'Lager Malt' },
        { name: 'malt', value: 'Wheat_Malt', title: 'Wheat Malt' },
        { name: 'malt', value: 'Roast_Barley', title: 'Roast Barley' },
        { name: 'malt', value: 'Dextrin_Malt', title: 'Dextrin Malt' },
      ],
    },
    hops: {
      title: 'hopsFilters',
      hopsFilters: [
        { name: 'hops', value: 'Cascade', title: 'Cascade' },
        { name: 'hops', value: 'Pacific', title: 'Pacific' },
        { name: 'hops', value: 'Fuggles', title: 'Fuggles' },
        { name: 'hops', value: 'Lactose', title: 'Lactose' },
        { name: 'hops', value: 'Coffee', title: 'Coffee' },
      ],
    },
  };

  constructor() {}

  ngOnInit(): void {}

  onClickFilter(filter: Filter): void {
    this.showFilter.emit(filter);
  }

  onClearFilter() {
    this.clearFilter.emit();
    let options =
      this.list._element.nativeElement.querySelectorAll('.mat-list-option');
    options.forEach((option: any) => {
      option.classList.remove('mat-list-single-selected-option');
    });
  }
}
