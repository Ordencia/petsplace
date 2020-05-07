import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
