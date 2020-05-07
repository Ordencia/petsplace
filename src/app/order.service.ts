import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  get(orderId) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  getOrders() { 
    return this.db.list('/orders', ref => ref.orderByChild('datePlaced')).snapshotChanges();
  }

  updateStatusOrComment(id, update) {
    if (update.status === 'completed') {
      update.completed = true;
    } else if (update.status === 'rejected') {
      update.rejected = true;
    }
    return this.db.object('/orders/' + id + '/orderStatus').update(update);
  }

  public getOrdersByUserID(userId: string) {
    return this.db
        .list("/orders", ref => ref.orderByChild("userId").equalTo(userId)).snapshotChanges()
          .map(actions => {
            return actions.map(action => ({
              key: action.key,
              userId: action.payload.val().userId,
              shipping: action.payload.val().shipping,
              datePlaced: action.payload.val().datePlaced,
              items: action.payload.val().items,
              total: action.payload.val().total,
              orderStatus: {
                status: action.payload.val().orderStatus.status,
                rejected: action.payload.val().orderStatus.rejected,
                completed: action.payload.val().orderStatus.completed,
                comments: action.payload.val().orderStatus.comments
              }
            }));
          });
  }
}
