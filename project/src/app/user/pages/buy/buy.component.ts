import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  msg: any = "";
  data: any;
  buyForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {
  }
  buy() {
    //if the form is valid, we place an order that adds the existing user cart to the bought table is the database
    if (this.buyForm.valid) {
      const methodValue = this.buyForm.value.method;
      const addressValue = this.buyForm.value.address;
      this.userService.buyCart(methodValue, addressValue).subscribe({
        next: (e) => {
          if (e) this.msg = "order placed successfully"
          else {
            this.msg = "an error occured while placing order"
          }
        },
        error: () => { this.msg = "an error occured while placing order" }
      })
    }
    else {
      this.msg = "please fill all the inputs"
    }
  }
  ngOnInit(): void {
    //we get the number of products in the cart and the total cost of the cart when the component renders
    this.userService.getCart().subscribe({
      next: (e) => {
        this.data = e;
      },
      error: (e) => {
        this.data = e
      }
    });
    //we initialise the form when the component renders
    this.buyForm = this.fb.group({
      method: ['', Validators.required],
      pass: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
}
