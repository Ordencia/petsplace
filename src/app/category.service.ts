import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db.list('/categories', 
      ref => ref.orderByChild('name')).snapshotChanges();
  }
}
