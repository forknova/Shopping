import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../auth-services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private authService: AuthServiceService) { }
  namebool = true;
  emailbool = true;
  passwordbool = true;
  message: any = "";
  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  async onsubmit() {
    if (this.registerForm.get('fullname')?.valid && this.registerForm.get('email')?.valid && this.registerForm.get('password')?.valid) {
      this.message = await this.authService.signUp(this.registerForm.value)
    }
  }
  changenamebool() {
    this.registerForm.get('fullname')?.valid ? this.namebool = true : this.namebool = false;
  }
  changeemailbool() {
    this.registerForm.get('email')?.valid ? this.emailbool = true : this.emailbool = false;
  }
  changepasswordbool() {
    this.registerForm.get('password')?.valid ? this.passwordbool = true : this.passwordbool = false;
  }
}
