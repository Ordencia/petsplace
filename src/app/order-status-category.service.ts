import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusCategoryService {

  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db.list('/order-status-categories').snapshotChanges();
  }
}
