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
  Foldername: string = 'http://localhost:4000/';
  constructor(private userService: UserService, private router: Router) { }
  changeSizes(color: string, index: number, size: string, P_id: string, qty: any) {
    //when a new color is selected, we change the options of the select tag 
    //to the available sizes for the new color
    //this function returns a new array containing the new sizes
    let temp: string[] = [];
    this.save(color, size, P_id, qty);
    for (let i = 0; i < (this.products[0][index].description).length; i++) {
      if (this.products[0][index].description[i][0] == color) {
        for (let j = 1; j < this.products[0][index].description[i].length; j++) {
          temp.push(this.products[0][index].description[i][j][0]);
        }
        return temp;
      }
    }
    return temp
  }

  getProducts() {
    //this is called on NgOnInit when the component is the rendered
    //it get all the products and puts them in the products array of this class
    this.userService.getCart()
      .subscribe({
        next: (e) => {
          !e || JSON.stringify(e) == '[]' ? (this.msg = "you cart is empty! add some products from the shop to your cart", this.clearMsg(), this.products = [[], 0]) : (this.products = e, console.log(e));
        },
        error: () => {
          this.msg = "an error occured while getting your data"; this.clearMsg()
        }
      });
  }

  save(Selectedcolor: string, SelectedSize: string, P_id: string, qty: any) {
    //edits products and fills a message that dissapears after 4 seconds 
    //the message contains either an error or a cart edited successfully message
    if (SelectedSize) this.userService.EditCart(Selectedcolor, SelectedSize, P_id, qty)
      .subscribe({
        next: (e) => e ? (this.msg = "cart edited successfully", this.clearMsg(), this.getProducts()) : (this.msg = "we had a problem editing cart", this.clearMsg()),
        error: (e) => (this.msg = "we had a problem editing cart", this.clearMsg()),
      });
  }
  clearMsg() {
    //this is called when a message is created so it is called after 4seconds to empty the message variable
    //when the msg is empty the ngIf won't work therefore the tag containing the msg dissapears from the screen
    setTimeout(() => { this.msg = "" }, 4000)
  }

  calculatesubtotal(qty: any, price: number, Selectedcolor: string, SelectedSize: string, P_id: string) {
    //this is called when a change is made on the inputs of any product, its calls the save function 
    //and it returns the new price of that product
    this.save(Selectedcolor, SelectedSize, P_id, qty);
    return (qty * price)
  }

  removeFromCart(P_id: string, size: string, color: string) {
    //this removes products from the cart
    this.userService.removeFromCart(P_id, size, color)
      .subscribe({
        next: (e) => { e ? (this.msg = "product removed successfully", this.clearMsg(), this.getProducts()) : (this.msg = "we had an error while removing the product", this.clearMsg()) },
        error: () => (this.msg = "we had an error while removing the product", this.clearMsg())
      })
  }

  ngOnInit(): void {
    //we get all the products when the component is rendered
    this.getProducts();
    //this is in the case of a user going from the search page while on a product pop up straight 
    //the another page
    if (document.body.style.overflowY == 'hidden') {
      document.body.style.overflowY = 'scroll';
    }
  }
}
