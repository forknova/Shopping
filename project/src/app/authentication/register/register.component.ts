import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient) { }
  namebool = true;
  emailbool = true;
  passwordbool = true;
  message = "";
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  onsubmit() {
    if (this.registerForm.get('name')?.valid && this.registerForm.get('email')?.valid && this.registerForm.get('password')?.valid) {
      this.http.post("http://localhost:4000/", this.registerForm.value)
        .subscribe({
          next: (bool) => bool ? this.message = "account created successfully!" : this.message = "email already registered",
          error: () => this.message = "Error accured while creating your account"
        }
        )
    }
  }
  changenamebool() {
    this.registerForm.get('name')?.valid ? this.namebool = true : this.namebool = false;
  }
  changeemailbool() {
    this.registerForm.get('email')?.valid ? this.emailbool = true : this.emailbool = false;
  }
  changepasswordbool() {
    this.registerForm.get('password')?.valid ? this.passwordbool = true : this.passwordbool = false;
  }
}
