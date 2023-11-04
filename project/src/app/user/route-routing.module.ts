import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './pages/search/search.component';
import { OptionsComponent } from './pages/options/options.component';
import { CartComponent } from './pages/cart/cart.component';
import { UsermainComponent } from './usermain/usermain.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OneOrderComponent } from './pages/one-order/one-order.component';
import { BuyComponent } from './pages/buy/buy.component';

const routes: Routes = [
  {
    //path:'' is for /admin on the url which sends us to to dashboard components that have the router-outlet 
    path: '', component: UsermainComponent, children: [
      { path: '', component: HomepageComponent },
      { path: 'search', component: SearchComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'Shoppingcart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'one-order/:id', component: OneOrderComponent },
      { path: 'buy/:id', component: BuyComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
