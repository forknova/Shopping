import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("role") != "admin") {
      this.router.navigateByUrl('/login')
    }
  }

}
