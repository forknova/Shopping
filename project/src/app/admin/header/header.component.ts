import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
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
      case "/admin": this.changeSelected('onProducts'); break;
      case "/admin/orders": this.changeSelected('onOrders'); break;
      case "/admin/users": this.changeSelected('onUsers'); break;
    }
  }
  changeSelected(variable: string): void {
    this.onUsers = false;
    this.onProducts = false;
    this.onOrders = false;
    if (variable == "onProducts") { this.onProducts = true; }
    if (variable == "onUsers") { this.onUsers = true; }
    if (variable == "onOrders") { this.onOrders = true; }
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
