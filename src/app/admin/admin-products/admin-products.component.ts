import { Observable } from 'rxjs/Observable';
import { Product } from './../../models/product';
import { map } from 'rxjs-compat/operator/map';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';
import { MatSort, MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  columnsToDisplay = ['title', 'price', 'category', 'edit'];

  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription =  this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filter(query: string) {
    this.dataSource = new MatTableDataSource((query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
