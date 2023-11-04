import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleSidebar: boolean = false;
  constructor(private router: Router) { }
  onUsers: boolean = false;
  onProducts: boolean = false;
  onOrders: boolean = false;
  ngOnInit(): void {
    switch (this.router.url) {
      case "/user": this.changeSelected('onProducts'); break;
      case "/user/Shoppingcart": this.changeSelected('onOrders'); break;
      case "/user/search": this.changeSelected('onUsers'); break;
    }
  }
  clearHeader() {
    this.onUsers = false;
    this.onProducts = false;
    this.onOrders = false;
  }
  changeSelected(variable: string): void {
    this.clearHeader()
    if (variable == "onProducts") { this.onProducts = true; }
    if (variable == "onUsers") { this.onUsers = true; }
    if (variable == "onOrders") { this.onOrders = true; }
  }
}
