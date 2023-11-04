import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  backendUrl: string = 'http://localhost:4000';

  getProducts(catergoy: string, search: string, filter: string, gender: string, page: string) {
    const params = new HttpParams()
      .set('searchField', search)
      .set('gender', gender)
      .set('type', catergoy)
      .set('sort', filter)
      .set('page', page);
    return this.http.get((this.backendUrl + '/search'), { params });
  }

  getOrders(u_Id: string) {
    return this.http.get((this.backendUrl + '/all-orders' + "/" + u_Id))
  }

  getOneOrder(u_Id: string, orderId: string) {
    const params = new HttpParams()
      .set('userId', u_Id)
      .set('orderId', orderId)
    return this.http.get((this.backendUrl + '/get-one-order'), { params });
  }

  buyCart(u_Id: string, paymentMethod: string, address: string) {
    let temp: any = {
      userId: u_Id,
      paymentMethod: paymentMethod,
      address: address
    }
    return this.http.post((this.backendUrl + '/buy'), temp);
  }

  editUser(email: string, password: string, u_Id: string) {
    let temp: any = {
      userId: u_Id,
      email: email,
      password: password,
    }
    return this.http.put(this.backendUrl + "/update-one", { temp });
  }

  getUserInfo(u_Id: string) {
    return this.http.get((this.backendUrl + '/show-info' + "/" + u_Id))
  }

  getOneProduct(id: string) {
    const params = new HttpParams()
      .set('productId', id);
    return this.http.get((this.backendUrl + '/get-one-product'), { params });
  }

  getCart(userId: string) {
    const params = new HttpParams()
      .set("userId", userId);
    return this.http.get((this.backendUrl + '/shoppingCart'), { params });
  }

  addToCart(userId: string, Selectedcolor: string, SelectedSize: string, P_Id: string, qty: number) {
    console.log(userId, Selectedcolor, SelectedSize, P_Id, qty)
    const params = new HttpParams()
      .set("productId", P_Id)
      .set("userId", userId);
    let temp: any = {
      size: SelectedSize,
      color: Selectedcolor,
      quantity: qty,
    }
    return this.http.post((this.backendUrl + '/addToCart'), temp, { params });
  }

  getCategories() {
    let url = this.backendUrl + '/addToCart';
    return this.http.get(this.backendUrl + "/allCategories");
  }

  removeFromCart(userId: string, productId: string, size: string, color: string) {
    const params = new HttpParams()
      .set("productId", productId)
      .set("userId", userId)
      .set("color", color)
      .set("size", size);
    return this.http.delete((this.backendUrl + '/deleteFromCart'), { params });
  }

  EditCart(userId: string, Selectedcolor: string, SelectedSize: string, P_Id: string, qty: string) {
    const params = new HttpParams()
      .set("productId", P_Id)
      .set("userId", userId);
    let temp: any = {
      size: SelectedSize,
      color: Selectedcolor,
      quantity: qty
    }
    return this.http.put((this.backendUrl + '/editCart'), temp, { params });
  }

  getFeatures() {
    return this.http.get(this.backendUrl + "/get-featured");
  }

}
