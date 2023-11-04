import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    //path:'' is for /admin on the url which sends us to to dashboard components that have the router-outlet 
    path: '', component: DashboardComponent, children: [
      { path: '', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouterRoutingModule { }
