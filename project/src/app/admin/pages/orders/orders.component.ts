import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private adminService: AdminService, private router: Router) { };
  data: [{ id: string, paymentMethod: string, prodnumb: number, totalCost: number, date: string }] = [{ id: "", paymentMethod: "", prodnumb: 0, totalCost: 0, date: "" }];
  temp: [{ id: string, paymentMethod: string, prodnumb: number, totalCost: number, date: string }] | string = "";
  DeletedBool: boolean | string = false;
  async OnSearch() {
    this.adminService.getOrders().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res == false) {
          this.temp = "access denied";
        }
        else {
          this.data = res
        }
      },
      error: (e) => {
        console.log(e)
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

