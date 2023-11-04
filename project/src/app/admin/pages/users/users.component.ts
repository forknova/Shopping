import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  adminId: any = localStorage.getItem("id");
  constructor(private adminService: AdminService, private router: Router) { };
  data: [{ id: string, fullname: string, email: string, role: string }] = [{ id: "", fullname: "", email: "", role: "" }];
  temp: [{ id: string, fullname: string, email: string, role: string }] | string = "";
  DeletedBool: boolean = false;
  async OnSearch() {
    this.temp = await this.adminService.getUsers(this.adminId);
    if (typeof this.temp == 'object') {
      this.data = this.temp
    }
  }
  async DeleteUser(user: string) {
    this.DeletedBool = await this.adminService.deleteUser(this.adminId, user);
    if (this.DeletedBool) {
      this.data.map((_user) => {
        if (_user.id == user) { this.data.splice(this.data.indexOf(_user), 1); return }
      })
    }
  }
  ngOnInit(): void {
    this.OnSearch();
    if (localStorage.getItem("role") != "admin") {
      this.router.navigateByUrl('/login')
    }
  }
}
