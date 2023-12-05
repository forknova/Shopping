import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  message: any;
  url: string = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url + "/all-users").pipe(map((res) => {
      return res;
    }));
  }

  deleteUser(user: string) {
    const params = new HttpParams()
      .set('userId', user);
    return this.http.delete(this.url + "/delete-user", { params }).pipe(map((res) => {
      return res;
    }));
  }

  getProducts() {
    return this.http.get(this.url + "/all-products").pipe(map((res) => {
      return res;
    }));
  }

  deleteProduct(product: string) {
    const params = new HttpParams()
      .set('productId', product);
    return this.http.delete(this.url + "/remove-product", { params }).pipe(map((res) => {
      return res;
    }));
  }

  AddProduct(product: object, name: string, category: string, gender: String, price: string, img: any) {
    const data = { description: product, name: name, price: price, category: { gender: gender, type: category } }
    const uploadData = new FormData();
    if (img) { uploadData.append('file', img, img.name) };
    uploadData.append('data', JSON.stringify(data))
    return this.http.post(this.url + "/add-product", uploadData).pipe(map((res) => {
      return res;
    }));
  }

  EditProduct(id: string, product: object, name: string, category: string, gender: String, price: string) {
    const data = { productId: id, description: product, name: name, price: price, category: { gender: gender, type: category } }
    console.log(data);
    return this.http.put(this.url + "/edit-product", data).pipe(map((res) => {
      return res;
    }));
  }

  getCategories() {
    return this.http.get(this.url + "/all-categories");
  }

  addCat(cat: string, gender: string) {
    return this.http.post(this.url + "/add-category", { 'gender': gender, 'type': cat });
  }

  addFeatured(P_id: string) {
    return this.http.post((this.url + "/add-featured"), {
      'productId': P_id
    })
  }

  removeFeatured(P_id: string) {
    return this.http.post((this.url + "/remove-from-featured"), {
      'productId': P_id
    })
  }
  getOrders() {
    return this.http.get(this.url + "/admin-orders").pipe(map((res) => {
      return res;
    }));
  }
  deleteOrder(order: string) {
    // const params = new HttpParams()
    //   .set('orderId', order);
    return this.http.delete(this.url + `/delete-order/${order}`).pipe(map((res) => {
      return res;
    }));
  }
}


