import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("role") != "admin") {
      this.router.navigateByUrl('/login')
    }
  }
}
