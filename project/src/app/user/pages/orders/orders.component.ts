import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  userId: string | null = localStorage.getItem("id");
  data: any = { id: '65420dbd1c0b2577bb926ef2', prodnumb: 2, totalCost: 360, paymentMethod: 'visa', date: '2023-11-01T08:35:09.541Z' };
  constructor(private userService: UserService) { }
  getOrders() {
    if (this.userId) this.userService.getOrders(this.userId).subscribe({
      next: (e) => { this.data = e, console.log(e) },
      error: (e) => console.log(e)
    })
  }
  ngOnInit(): void {
    this.getOrders()
  }
}
