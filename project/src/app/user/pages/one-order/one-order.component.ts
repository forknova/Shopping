import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-order',
  templateUrl: './one-order.component.html',
  styleUrls: ['./one-order.component.css']
})
export class OneOrderComponent {
  userId: string | null = localStorage.getItem("id");
  orderId: string | null = ""
  data: any = "";
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
  }
  getOrders() {
    console.log(this.userId, this.orderId)
    if (this.userId && this.orderId) this.userService.getOneOrder(this.userId, this.orderId).subscribe({
      next: (e) => { this.data = e, console.log(e) },
      error: (e) => console.log(e)
    })
  }
  ngOnInit(): void {
    this.getOrders();
  }
}
