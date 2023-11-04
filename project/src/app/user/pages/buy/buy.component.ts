import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  userId: string | null = "";
  msg: any = ""
  constructor(private userService: UserService) {
    this.userId = localStorage.getItem("id")
  }
  buy(method: string, pass: string, address: string) {
    if (this.userId) this.userService.buyCart(this.userId, method, address).subscribe({
      next: (e) => { this.msg = e },
      error: (e) => { this.msg = e }
    })
  }
}
