import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/authentication/auth-services/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthServiceService) { }
  message: string = "";
  temp: any;
  emailbool = true;
  passwordbool = true;
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  async onsubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    let tokenInfo: any = false;
    if (email && password) {
      this.auth.signIn(email, password).subscribe({
        next: (res: any) => {
          if (res) {
            tokenInfo = jwtDecode(JSON.stringify(res));
            if (tokenInfo.role == "user") {
              this.temp = { result: "U" }
            }
            else if (tokenInfo.role == "admin") {
              this.temp = { result: "A" }
            }
          }
          else {
            this.temp = "incrorrecte"
          }
          if (this.temp === 'incorrecte') this.message = 'email/password combo is incorrect';
          else if (this.temp.result === 'A') { localStorage.setItem('token', JSON.stringify(res)); this.router.navigateByUrl('admin') }
          else if (this.temp.result === 'U') {
            localStorage.setItem('token', JSON.stringify(res)); this.router.navigateByUrl('user');
          }
        },
        error: (e) => {
          if (e.ok == false) {
            this.message = 'email/password combo is incorrect'
          }
          else {
            this.message = 'error occurred while logging you in';
          }
        }
      })
    }
  }

  changeemailbool() {
    this.registerForm.get('email')?.valid ? this.emailbool = true : this.emailbool = false;
  }

  changepasswordbool() {
    this.registerForm.get('password')?.valid ? this.passwordbool = true : this.passwordbool = false;
  }
}

