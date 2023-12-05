import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardRouterRoutingModule } from './dashboard-router-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './pages/orders/orders.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRouterRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
