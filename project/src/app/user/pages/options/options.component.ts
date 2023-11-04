import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  userId: any = localStorage.getItem("id");
  email: string = "ahmad.ahmad@ahmad";
  password: string = "ahmad.ahmad@ahmad";
  editable: boolean = false;
  constructor(private router: Router, private userService: UserService) { }
  save(email: string, password: string) {
    console.log(email, password)
    if (!this.editable) {
      this.userService.editUser(this.userId, email, password).subscribe({
        next: (e) => { console.log(e) },
        error: (e) => { console.log(e) }
      })
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/authentication/login');
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe({
      next: (e) => {
        console.log(e)
        const temp: any = e;
        this.email = temp.email;
        this.password = temp.password
      },
      error: () => { }
    })
  }
  ngOnInit(): void {
    if (localStorage.getItem("role") != "user") {
      this.router.navigateByUrl('/login')
    }
    this.getUserInfo()
  }
}
