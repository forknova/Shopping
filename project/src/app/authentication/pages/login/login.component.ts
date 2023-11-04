import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/authentication/auth-services/auth-service.service';

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
    if (email && password) {
      this.temp = await this.auth.signIn(email, password);
      if (this.temp === 'error') this.message = 'error occurred while logging you in';
      else if (this.temp === 'incorrecte') this.message = 'email/password combo is incorrect';
      else if (this.temp.result === 'A') { localStorage.setItem('role', 'admin'); localStorage.setItem('id', this.temp.id); this.router.navigateByUrl('admin') }
      else if (this.temp.result === 'U') {
        localStorage.setItem('role', 'user'); localStorage.setItem('id', this.temp.id); this.router.navigateByUrl('user');
      }
    }
  }
  changeemailbool() {
    this.registerForm.get('email')?.valid ? this.emailbool = true : this.emailbool = false;
  }

  changepasswordbool() {
    this.registerForm.get('password')?.valid ? this.passwordbool = true : this.passwordbool = false;
  }
}

