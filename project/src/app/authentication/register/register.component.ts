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
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  onsubmit() {
    console.log(this.registerForm.value)
    if (this.registerForm.get('name')?.valid && this.registerForm.get('email')?.valid && this.registerForm.get('password')?.valid) {
      this.http.post("url", this.registerForm.value)
        .subscribe(
          () => {

          },
          () => {
            console.log("Error accured");
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
