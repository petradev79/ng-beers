import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css'],
})
export class ListHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  itemsPerPage = 25;
  sort = 'up';

  constructor() {}

  ngOnInit(): void {}

  onItemsPerPageChange(numberPerPage: number): void {
    this.itemsPerPageChange.emit(numberPerPage);
    this.itemsPerPage = numberPerPage;
  }

  onColumnsChange(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onSortChange(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }
}
