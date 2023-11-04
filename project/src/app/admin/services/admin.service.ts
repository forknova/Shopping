import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  message: any;
  url: string = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  async getUsers(AdminId: string): Promise<[{ id: string, fullname: string, email: string, role: string }] | string> {
    const params = new HttpParams()
      .set('id', AdminId);
    try {
      const res: any = await firstValueFrom(this.http.get(this.url + "/allUsers", { params }))
      if (res == false) {
        this.message = "access denied";
      }
      else if (res.result == "user array is empty") {
        this.message = res.result
      }
      else {
        this.message = res
      }
    }
    catch (e) {
      this.message = "error occured while getting data"
    }
    return this.message
  }

  async deleteUser(AdminId: string, user: string): Promise<boolean> {
    const params = new HttpParams()
      .set('adminId', AdminId)
      .set('userId', user);
    try {
      const res: any = await firstValueFrom(this.http.delete(this.url + "/deleteUser", { params }))
      if (res == false) {
        this.message = "access denied";
      }
      else {
        this.message = res
      }
    }
    catch (e) {
      this.message = e
    }
    return this.message
  }

  async getProducts(AdminId: string): Promise<[{ _id: string, name: string, price: string, description: [] }] | string> {
    const params = new HttpParams()
      .set('id', AdminId);
    try {
      const res: any = await firstValueFrom(this.http.get(this.url + "/allProducts", { params }))
      if (res == false) {
        this.message = "access denied";
      }
      else {
        this.message = res
      }
    }
    catch (e) {
      this.message = "error " + e
    }
    return this.message
  }

  async deleteProduct(AdminId: string, product: string): Promise<boolean> {
    const params = new HttpParams()
      .set('adminId', AdminId)
      .set('productId', product);
    try {
      const res: any = await firstValueFrom(this.http.delete(this.url + "/removeProduct", { params }))
      if (res == false) {
        this.message = "access denied";
      }
      else {
        this.message = res
      }
    }
    catch (e) {
      this.message = e
    }
    return this.message
  }

  AddProduct(product: object, name: string, category: string, gender: String, price: string, admin: string, img: any) {
    const params = new HttpParams()
      .set('adminId', admin);
    const data = { description: product, name: name, price: price, category: { gender: gender, type: category } }
    const uploadData = new FormData();
    uploadData.append('file', img, img.name);
    uploadData.append('data', JSON.stringify(data))
    return this.http.post(this.url + "/addProduct", uploadData, { params });
  }

  getCategories() {
    return this.http.get(this.url + "/allCategories");
  }

  addCat(id: string, cat: string, gender: string) {
    return this.http.post(this.url + "/addCategory", { 'adminId': id, 'gender': gender, 'type': cat });
  }

  addFeatured(P_id: string, id: string) {
    return this.http.post((this.url + "/add-featured"), {
      'productId': P_id,
      adminId: id
    })
  }

  removeFeatured(P_id: string, id: string) {
    return this.http.post((this.url + "/remove-from-featured"), {
      'productId': P_id,
      adminId: id
    })
  }
  async getOrders(AdminId: string): Promise<[{ id: string, fullname: string, email: string }] | string> {
    const params = new HttpParams()
      .set('id', AdminId);
    try {
      const res: any = await firstValueFrom(this.http.get(this.url + "/allOrders", { params }))
      if (res == false) {
        this.message = "access denied";
      }
      else {
        this.message = res
      }
    }
    catch (e) {
      this.message = e
    }
    return this.message
  }
}


