import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/authentication/auth-services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  email: string = "";
  password: string = "";
  editable: boolean = false;
  msg: string = "";
  accountForm: FormGroup = this.fb.group({
    email: ["", Validators.email],
    password: ["****", [Validators.required, Validators.minLength(8)]]
  });
  constructor(private userService: UserService, private fb: FormBuilder, private authsetvice: AuthServiceService, private router: Router) { }
  save() {
    //if the save button is pressed, and the form is valid , we make a request to the backend 
    //that saves the new email and password
    if (!this.editable) {
      if (this.accountForm.valid && this.accountForm.value.email.length > 2) {
        this.userService.editUser(this.accountForm.value.email, this.accountForm.value.password).subscribe({
          next: (e) => {
            this.msg = "account info edited successfully!"
          },
          error: (e) => { console.log(e) }
        })
      }
      else {
        this.msg = "please make sure that the email is valid and the password is 8 characters atleast!"
      }
    }
  }

  handleBtn() {
    //if the pressed button have the save word on it,we call the save function
    //and switch the button to edit, else we switch it to save without calling anything
    this.editable = !this.editable;
    if (!this.editable) {
      this.save()
    }
  }

  getUserInfo() {
    //this gets the email of the user and it is called on ngOnInit
    this.userService.getUserInfo().subscribe({
      next: (e: any) => {
        this.email = e.email;
        this.accountForm.value.email = this.email;
      },
      error: (e) => { console.log(e) }
    })
  }

  handleDelete() {
    this.userService.deleteUser().subscribe({
      next: (e) => {
        this.authsetvice.logout().subscribe({
          next: (e) => {
            localStorage.clear();
            this.router.navigateByUrl('/authentication/login');
          }
          , error: (e) => {
            console.error(e)
          }
        })
      },
      error: (e) => {
        this.msg = "could not delete account! try later"
      }
    })
  }

  ngOnInit(): void {
    this.getUserInfo();
    //we initialise the form in ngOnInit
  }
}
