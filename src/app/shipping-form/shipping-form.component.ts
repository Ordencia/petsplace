import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { Shipping } from '../models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  
  shipping:Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: ''
  }; 
  userSubscription: Subscription;
  userId: string;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  
  async placeOrder() {
    let order = new Order (this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }  
}
