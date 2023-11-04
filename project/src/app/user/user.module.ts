import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CartComponent } from './pages/cart/cart.component';
import { OptionsComponent } from './pages/options/options.component';
import { SearchComponent } from './pages/search/search.component';
import { UsermainComponent } from './usermain/usermain.component';
import { RouteRoutingModule } from './route-routing.module';
import { FooterComponent } from './footer/footer.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OneOrderComponent } from './pages/one-order/one-order.component';
import { BuyComponent } from './pages/buy/buy.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    CartComponent,
    OptionsComponent,
    SearchComponent,
    UsermainComponent,
    FooterComponent,
    OrdersComponent,
    OneOrderComponent,
    BuyComponent,
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,
  ]
})
export class UserModule { }
