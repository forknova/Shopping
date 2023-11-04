import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  categories: any = ['pants', 'jeans', 'jackets', 'tshirts', 'coats'];
  cat1: string[] = [];
  cat2: string[] = [];
  Featured: any = [];
  imgFolder: string = '../../../../assets/product-images/';
  constructor(private router: Router, private userService: UserService) { }
  getCategories() {
    this.userService.getCategories().subscribe({
      next: (e) => {
        this.categories = e,
          this.cat1 = [this.categories[0], this.categories[1]];
        this.cat2 = [this.categories[2], this.categories[3], this.categories[4]];
      },
      error: (e) => { this.categories = [e] }
    })
  }

  getFeatured() {
    this.userService.getFeatures().subscribe({
      next: (e) => {
        this.Featured = e
      },
      error: (e) => { this.Featured = [e] }
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem("role") != "user") {
      this.router.navigateByUrl('/login')
    }
    this.getCategories();
    this.getFeatured();
  }
}
