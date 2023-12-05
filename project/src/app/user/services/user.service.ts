import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  backendUrl: string = 'http://localhost:4000';

  getProducts(catergoy: string, search: string, filter: string, gender: string, page: number) {
    const params = new HttpParams()
      .set('searchField', search)
      .set('gender', gender)
      .set('type', catergoy)
      .set('sort', filter)
      .set('page', page);
    return this.http.get((this.backendUrl + '/search'), { params }).pipe(map((res) => {
      return res;
    }));;
  }

  getOrders() {
    return this.http.get((this.backendUrl + '/all-orders')).pipe(map((res) => {
      return res;
    }));
  }

  getOneOrder(orderId: string) {
    console.log(orderId)
    return this.http.get((this.backendUrl + '/get-one-order/' + orderId)).pipe(map((res) => {
      return res;
    }));;
  }

  buyCart(paymentMethod: string, address: string) {
    let temp: any = {
      paymentMethod: paymentMethod,
      address: address
    }
    return this.http.post((this.backendUrl + '/buy'), temp).pipe(map((res) => {
      return res;
    }));;
  }

  editUser(email: string, password: string) {
    let temp: any = {
      email: email,
      password: password,
    }
    return this.http.put(this.backendUrl + "/update-one", { ...temp }).pipe(map((res) => {
      return res;
    }));;
  }

  deleteUser() {
    return this.http.delete(this.backendUrl + "/delete-user").pipe(map((res) => {
      return res;
    }));;
  }

  getUserInfo() {
    return this.http.get((this.backendUrl + '/show-info')).pipe(map((res) => {
      return res;
    }));
  }

  getOneProduct(id: string) {
    const params = new HttpParams()
      .set('productId', id);
    return this.http.get((this.backendUrl + '/get-one-product'), { params }).pipe(map((res) => {
      return res;
    }));;
  }

  getCart() {
    return this.http.get((this.backendUrl + '/shopping-cart')).pipe(map((res) => {
      return res;
    }));;
  }

  addToCart(Selectedcolor: string, SelectedSize: string, P_Id: string, qty: number) {
    let temp: any = {
      size: SelectedSize,
      color: Selectedcolor,
      quantity: qty,
      productId: P_Id
    }
    return this.http.post((this.backendUrl + '/add-to-cart'), temp).pipe(map((res) => {
      return res;
    }));;
  }

  getCategories() {
    return this.http.get(this.backendUrl + "/all-categories").pipe(map((res) => {
      return res;
    }));
  }

  removeFromCart(productId: string, size: string, color: string) {
    const params = new HttpParams()
      .set("productId", productId)
      .set("color", color)
      .set("size", size);
    return this.http.delete((this.backendUrl + '/delete-from-cart'), { params }).pipe(map((res) => {
      return res;
    }));;
  }

  EditCart(Selectedcolor: string, SelectedSize: string, P_Id: string, qty: string) {
    const params = new HttpParams()
      .set("productId", P_Id)
    let temp: any = {
      size: SelectedSize,
      color: Selectedcolor,
      quantity: qty
    }
    return this.http.put((this.backendUrl + '/edit-cart'), temp, { params }).pipe(map((res) => {
      return res;
    }));;
  }

  getFeatures() {
    return this.http.get(this.backendUrl + "/get-featured").pipe(map((res) => {
      return res;
    }));;
  }

}
