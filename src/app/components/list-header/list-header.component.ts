import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css'],
})
export class ListHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  itemsPerPage = 25;

  constructor() {}

  ngOnInit(): void {}

  onItemsPerPageChange(numberPerPage: number): void {
    this.itemsPerPageChange.emit(numberPerPage);
    this.itemsPerPage = numberPerPage;
  }

  onColumnsChange(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
