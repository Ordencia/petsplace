import { ShoppingCart } from './shopping-cart';
import { ORDER_CONSTANTS } from '../constants/constants';

export class Order {
    datePlaced: number;
    items: any[];
    total: number;
    orderStatus: any;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
        
        this.total = shoppingCart.totalPrice;

        this.orderStatus = {
          status: ORDER_CONSTANTS.DEFAULT_STATUS,
          rejected: false,
          comments: '',
          completed: false
        }
    }
}