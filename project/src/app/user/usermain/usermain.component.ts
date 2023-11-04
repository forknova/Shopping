import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermain',
  templateUrl: './usermain.component.html',
  styleUrls: ['./usermain.component.css']
})
export class UsermainComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("role") != "user") {
      this.router.navigateByUrl('/login')
    }
  }
}