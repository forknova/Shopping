import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  data: any = [];
  router: any;
  constructor(private userService: UserService) { }
  getOrders() {
    //This get all past orders of the user and its called when the component is rendered
    this.userService.getOrders().subscribe({
      next: (e) => { this.data = e },
      error: (e) => console.log(e)
    })
  }
  ngOnInit(): void {
    this.getOrders()
  }
}
