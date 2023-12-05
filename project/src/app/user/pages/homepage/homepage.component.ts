import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  categories: string[] | any = ['pants', 'jeans', 'jackets', 'tshirts', 'coats'];
  cat1: string[] = [];
  Featured: any = [];
  imgFolder: string = 'http://localhost:4000/';
  route: any;
  constructor(private router: Router, private userService: UserService) { }
  getCategories() {
    //this is called on ngOnInit and it fills the categories array of this class with all the categories
    //in the database
    this.userService.getCategories().subscribe({
      next: (e) => {
        this.categories = e;
        if (window.innerWidth < 700) {
          this.cat1 = [this.categories[0]];
        }
        else {
          this.cat1 = [this.categories[0], this.categories[1], this.categories[2]];
        }
      },
      error: (e) => { this.categories = [e] }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    //if the screen width is smaller than 700px, only one product is left in the array and this function
    // changes this product 
    if (window.innerWidth < 700) {
      this.cat1 = [this.cat1[this.cat1.length - 1]];
    }
    else if (this.cat1.length == 1) {
      let temp = this.categories.indexOf(this.cat1[0])
      if (temp > 1) {
        this.cat1 = [this.categories[temp - 2], this.categories[temp - 1], this.categories[temp]];
      }
      else this.cat1 = [this.categories[0], this.categories[1], this.categories[2]];
    }
  }

  handleSlide(limit: number) {
    //since we only show 3 categories on the homepage,this function changes the cat1 array
    //to either add a product to the end and remove one from the beginning or the opposite 
    //depending on the limit property,if its positive the array is shifted to the rights by 1
    //else it is shifted to the left by 1
    if (limit > 0) {
      let nbr = this.categories.indexOf(this.cat1[this.cat1.length - 1]);
      if (this.categories.length > nbr + 1) {
        this.cat1.push(this.categories[nbr + 1]);
        this.cat1.shift();
      }
    } else {
      if (this.categories[0] != this.cat1[0]) {
        let nbr = this.categories.indexOf(this.cat1[0]);
        this.cat1.unshift(this.categories[nbr - 1]);
        this.cat1.pop();
      }
    }
  }

  getFeatured() {
    //this gets all the featured products from the database when the component is rendered
    this.userService.getFeatures().subscribe({
      next: (e) => {
        this.Featured = e;
      },
      error: (e) => { this.Featured = [e] }
    })
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFeatured();
    //this is in the case of a user going from the search page while on a product pop up straight 
    //the another page
    if (document.body.style.overflowY == 'hidden') {
      document.body.style.overflowY = 'scroll';
    }
  }
}
