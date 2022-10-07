import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
})
export class ListHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Input() itemsPerPage!: string;
  @Input() sort!: string;

  constructor() {}

  ngOnInit(): void {}

  onItemsPerPageChange(numberPerPage: string): void {
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
