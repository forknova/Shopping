import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-one-order',
  templateUrl: './one-order.component.html',
  styleUrls: ['./one-order.component.css']
})
export class OneOrderComponent {
  orderId: string | null = ""
  data: any = "";
  products: any = [];
  router: any;
  Foldername: string = 'http://localhost:4000/';
  constructor(private userService: UserService, private route: ActivatedRoute) {
    //we take the parameter containing the order's id and put it in the orderId variable
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
  }
  getOrder() {
    //this functions get the data of a specific order and puts it in the data variable
    if (this.orderId) this.userService.getOneOrder(this.orderId).subscribe({
      next: (e: any) => {
        this.data = e[0];
        for (let i = 1; i < e.length; i++) {
          this.products.push(e[i])
        }
      },
      error: (e) => console.log(e)
    })
  }
  ngOnInit(): void {
    this.getOrder();
  }
}
