import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  msg: string = "";
  products: any = [[], 0];
  Foldername: string = '../../../../assets/product-images/'
  userId: any = localStorage.getItem("id");
  constructor(private userService: UserService, private router: Router) { }

  changeSizes(color: string, index: number, size: string, P_id: string, qty: any) {
    let temp: string[] = [];
    this.save(color, size, P_id, qty);
    //we have the index on which the product we want resides, so we get to that product and access the description property
    //which contains and array of the colors that this product have as the first element and up to 4 arrays containing 
    //the sizes available and the qty of each size
    for (let i = 0; i < (this.products[0][index].description).length; i++) {
      if (this.products[0][index].description[i][0] == color) {
        //after we find the array in description that contains the color we need on the first index
        //we loop over this array and start from the index 1
        //on each iteration we get the value on the first index of the array we are accessing,that value is the 
        //one of the sizes we have for this specific color on this specific product
        for (let j = 1; j < this.products[0][index].description[i].length; j++) {
          // we push the size into a temporary array containing all sizes available for this color of this product 
          temp.push(this.products[0][index].description[i][j][0]);
        }
        return temp;
      }
    }
    return temp
  }

  getProducts() {
    this.userService.getCart(this.userId)
      .subscribe({
        next: (e) => {
          !e || JSON.stringify(e) == '[]' ? (this.msg = "you cart is empty! add some products from the shop to your cart", this.clearMsg(), this.products = [[], 0]) : (this.products = e, console.log(e));
        }
        ,
        error: () => {
          this.msg = "an error occured while getting your data"; this.clearMsg()
        }
      });
  }

  save(Selectedcolor: string, SelectedSize: string, P_id: string, qty: any) {
    //edits products
    if (SelectedSize) this.userService.EditCart(this.userId, Selectedcolor, SelectedSize, P_id, qty)
      .subscribe({
        next: (e) => e ? (this.msg = "cart edited successfully", this.clearMsg()) : (this.msg = "we had a problem editing cart", this.clearMsg()),
        error: (e) => (this.msg = "we had a problem editing cart", this.clearMsg()),
      });
  }
  clearMsg() {
    setTimeout(() => { this.msg = "" }, 4000)
  }
  ngOnInit(): void {
    this.getProducts();
    if (localStorage.getItem("role") != "user") {
      this.router.navigateByUrl('/login')
    }
  }

  calculatesubtotal(qty: any, price: number, Selectedcolor: string, SelectedSize: string, P_id: string) {
    this.save(Selectedcolor, SelectedSize, P_id, qty);
    return (qty * price)
  }

  removeFromCart(P_id: string, size: string, color: string) {
    this.userService.removeFromCart(this.userId, P_id, size, color)
      .subscribe({
        next: (e) => { e ? (this.msg = "product removed successfully", this.clearMsg(), this.getProducts()) : (this.msg = "we had an error while removing the product", this.clearMsg()) },
        error: () => (this.msg = "we had an error while removing the product", this.clearMsg())
      })
  }
}
