import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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
    this.onRouteChange();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/authentication/login');
  }

  onRouteChange() {
    if (this.router.url.startsWith("/user/Shoppingcart")) this.changeSelected('onOrders')
    else if (this.router.url.startsWith("/user/search")) this.changeSelected('onUsers')
    else if (this.router.url.startsWith("/user")) this.changeSelected('onProducts')
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
