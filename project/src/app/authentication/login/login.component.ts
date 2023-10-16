import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) { }
  message = "";
  emailbool = true;
  passwordbool = true;
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  onsubmit() {
    if (this.registerForm.get('email')?.valid && this.registerForm.get('password')?.valid) {
      this.http.post("http://localhost:4200/", this.registerForm.value)
        .subscribe({
          next: (bool) => bool ? this.router.navigateByUrl("/homepage") : this.message = "email/password combo is incorrect",
          error: () => this.message = "Error accured while logging you in"
        }
        )
    }
  }
  changeemailbool() {
    this.registerForm.get('email')?.valid ? this.emailbool = true : this.emailbool = false;
  }
  changepasswordbool() {
    this.registerForm.get('password')?.valid ? this.passwordbool = true : this.passwordbool = false;
  }
}

