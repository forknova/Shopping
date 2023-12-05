import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  message: string = "Error accured while creating your account"
  constructor(private http: HttpClient) { }
  backendUrl: string = 'http://localhost:4000';
  signUp(user: object) {
    return this.http.post(this.backendUrl + "/register", user).pipe(map((res) => {
      return res;
    }));
  }

  signIn(email: string, password: string) {
    let temp = {
      email: email
      , password: password
    }
    return this.http.post(this.backendUrl + "/login", temp).pipe(map((res) => {
      return res;
    }));
  }
  refreshToken() {
    let token: any = localStorage.getItem('token');
    token = JSON.parse(token);
    return this.http.put(this.backendUrl + "/refresh-token", { token: token.refreshToken }).pipe(map((res) => {
      return res;
    }));
  }
  logout() {
    return this.http.delete(this.backendUrl + "/logout").pipe(map((res) => {
      return res;
    }));
  }
}
