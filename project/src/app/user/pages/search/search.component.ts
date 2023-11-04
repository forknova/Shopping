import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  constructor(private userService: UserService, private router: Router) { }
  data: any = [];
  temp: any = [];
  userId: string | null = localStorage.getItem("id");
  categories: any = [];
  imgFolder: string = '../../../../../../backend/public/';
  showProduct: boolean = false;
  Product: any = {};
  colors: string[] = [];
  sizes: string[] = [];
  selectedColor: string = "";
  selectedSize: string = "";
  SelectedQuantity: number = 1;
  SelectedPost: string = "";
  nbrOfPosts: number = 1;
  search(catergoy: string, search: string, filter: string, gender: string, page: string) {
    this.userService.getProducts(catergoy, search, filter, gender, page)
      .subscribe({
        next: (res) => {
          if (res) {
            this.temp = res, this.data = this.temp[0], this.nbrOfPosts = this.temp[1]
          }
          else { this.data = [] }
        },
        error: (e) => { this.data = [{ error: 'error occured while loading data!' }] }
      })
    return false;
  }
  addToCart() {
    if (this.userId) {
      this.userService.addToCart(this.userId, this.selectedColor, this.selectedSize, this.SelectedPost, this.SelectedQuantity)
        .subscribe({
          next: (e) => { console.log(e) },
          error: (e) => { console.log(e) }
        });
    }
  }

  getCategories() {
    this.userService.getCategories().subscribe({
      next: (e) => { this.categories = e },
      error: (e) => { this.categories = [e] }
    })
  }

  toggleShowProducts(id: string) {
    this.SelectedPost = id;
    this.showProduct = !this.showProduct;
    this.userService.getOneProduct(id)
      .subscribe({
        next: (e) => { this.Product = e, this.setColors(this.Product.description), this.setSizes(this.Product.description[0][0]) },
        error: (e) => console.error(e)
      })
  }

  setColors(description: any[]) {
    this.colors = []
    description.map((Color_array) => {
      this.colors.push(Color_array[0]);
    })
  }

  setSizes(color: string) {
    this.sizes = [];
    this.Product.description.map((Color_array: any) => {
      if (Color_array[0] == color) {
        for (let i = 1; i < Color_array.length; i++) {
          this.selectedSize = Color_array[1][0];
          this.selectedColor = Color_array[0];
          this.sizes.push(Color_array[i][0]);
        }
        return;
      }
    })
  }

  handleChangeColor(color: string) {
    this.selectedColor = color;
    this.setSizes(color);
  }

  handleChangeSize(size: string) {
    this.selectedSize = size;
  }

  handleQtyChange(nbr: number) {
    this.SelectedQuantity += nbr
  }

  ngOnInit(): void {
    this.search("", "", "", "", "1");
    if (localStorage.getItem("role") != "user") { this.router.navigateByUrl('/login') };
    this.getCategories()
  }

}