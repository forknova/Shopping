import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private adminService: AdminService, private router: Router) { };
  data: [{ id: string, fullname: string, email: string, role: string }] = [{ id: "", fullname: "", email: "", role: "" }];
  temp: [{ id: string, fullname: string, email: string, role: string }] | string = "";
  DeletedBool: boolean | string = false;
  async OnSearch() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        if (res == false) {
          this.temp = "access denied";
        }
        else if (res.result == "user array is empty") {
          this.temp = res.result
        }
        else {
          this.data = res
        }
      },
      error: () => {
        this.temp = "error occured while getting data"
      }
    })
  }
  async DeleteUser(user: string) {
    this.adminService.deleteUser(user).subscribe({
      next: (res: any) => {
        if (res == false) {
          this.DeletedBool = "access denied";
        }
        else {
          this.DeletedBool = res;
          if (this.DeletedBool) {
            this.data.map((_user) => {
              if (_user.id == user) { this.data.splice(this.data.indexOf(_user), 1); return }
            })
          }
        }
      },
      error: (e: any) => {
        this.DeletedBool = e
      }
    });
  }
  ngOnInit(): void {
    this.OnSearch();
  }
}
