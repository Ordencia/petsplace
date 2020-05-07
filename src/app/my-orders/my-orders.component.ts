import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Order } from '../models/order';
import { switchMap } from 'rxjs/operators';
import { AdminAuthGuard } from '../admin-auth-guard.service';
import { Subscription } from 'rxjs';
import { MatSort, MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnDestroy{
  orders: Order[];
  subscription: Subscription;
  columnsToDisplay = ['name', 'datePlaced', 'orderStatus.status', 'view'];
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private orderService: OrderService, private authService: AuthService, private adminAuthService: AdminAuthGuard) {
    this.subscription =  this.authService.user$.switchMap(user => this.orderService.getOrdersByUserID(user.uid))
      .subscribe(orders => {
        this.orders = orders;
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  // private initializeTable(orders: Order[]) {
  //   this.tableResource = new DataTableResource(orders);
  //   this.tableResource.query({ offset: 0, limit: 10 })
  //     .then(items => this.items = items);
  //   this.itemCount = orders.length;
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //   .then(items => this.items = items);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
