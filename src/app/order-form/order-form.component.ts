import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderStatusCategoryService } from '../order-status-category.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AdminAuthGuard } from '../admin-auth-guard.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  statusCategories$;
  order$;
  id;
  update: Order["orderStatus"];
  isAdmin: boolean;
  subscription;

  constructor(
    private statusCategoryService: OrderStatusCategoryService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private adminAuthService: AdminAuthGuard) { 
    this.statusCategories$ = statusCategoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.adminAuthService.canActivate()
      .subscribe(isAdmin => {
        if (isAdmin)  this.isAdmin = true;
      });
  }

  updateStatusOrComment(update) {
    if (this.id) this.orderService.updateStatusOrComment(this.id, update);
    if (this.isAdmin)
      this.router.navigate(['/admin/orders']);
    else
      this.router.navigate(['/order-history']);
  }

  completeOrder() {
    if (confirm('Are you sure you want to complete this order? Only confirm if you received all products and need no further assistance (cannot be undone).')) {
      this.update.status = 'completed';
      this.updateStatusOrComment(this.update);
    }
  }

  async ngOnInit() {
    this.order$ = await this.orderService.get(this.id).pipe(tap((order:Order) => this.update=order.orderStatus));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
