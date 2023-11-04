import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  message: string = "Error accured while creating your account"
  constructor(private http: HttpClient) { }
  async signUp(user: object): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.http.post("http://localhost:4000/register", user))

      res ? this.message = "account created successfully!" : this.message = "email already registered"
    }
    catch {
      this.message = "Error accured while creating your account"
    }
    return this.message
  }
  async signIn(email: string, password: string): Promise<string> {
    if (email && password) {
      const params = new HttpParams()
        .set('email', email)
        .set('password', password);
      try {
        //since .toPromice() became deprecated i used the new rjx function to fix that, it does the same thing that toPromise does 
        //toPromise changes the observable to a promise and since an observable could return multiple values it takes the last one therfor we 
        //use firstValueFrom() from rjx, we could also use lastValueFrom() since here the observable returns 1 value
        const res: any = await firstValueFrom(this.http.get('http://localhost:4000/login', { params }));
        if (!res) {
          return 'incorrecte';
        } else {
          return res;
        }
      } catch (error) {
        return 'error';
      }
    }
    return 'error';
  }
}
