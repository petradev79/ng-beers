import { Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface NodeData {
  name: string;
  children?: NodeData[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent implements OnInit {
  @Input() data: any;
  private _transformer = (node: NodeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
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

  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
