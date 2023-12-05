import { Component, Renderer2 } from '@angular/core';
import { UserService } from '../../services/user.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  constructor(private route: ActivatedRoute, private userService: UserService) { }
  data: any = [];
  temp: any = [];
  categories: string[] | any = [];
  imgFolder: string = 'http://localhost:4000/';
  showProduct: boolean = false;
  Product: any = {};
  colors: string[] = [];
  sizes: string[] = [];
  _category: string = "";
  searchValue: string = "";
  filter: string = "";
  gender: string = "";
  selectedColor: string = "";
  selectedSize: string = "";
  SelectedQuantity: number = 1;
  SelectedPage: number = 1;
  SelectedPost: string = "";
  nbrOfPosts: number = 1;
  nbrOfPages: number[] = [];
  msg: string = "";
  search(catergoy: string, search: string, filter: string, gender: string, page: number) {
    //this is called when the coponent is rendered or when the search button is pressed
    //it request new data with the specified filters 
    this.data = [];
    if (!(this._category == catergoy && this.searchValue == search && this.filter == filter && this.gender == gender)) {
      this.SelectedPage = 1;
      this._category = catergoy;
      this.searchValue = search;
      this.filter = filter;
      this.gender = gender;
    }
    this.userService.getProducts(this._category, this.searchValue, this.filter, this.gender, this.SelectedPage)
      .subscribe({
        next: (res) => {
          if (res) {
            this.temp = res, this.temp[0].length > 0 ? this.data = this.temp[0] : this.data = [{ name: 'no posts available for the selected filters' }], this.nbrOfPosts = this.temp[1], this.generateArray((this.temp[2] / 12))
          }
          else { this.data = [] }
          console.log(this.data)
        },
        error: (e) => { this.data = [{ name: "error occured while loading products! reload the page or try again" }] }
      })
    return false;
  }

  generateArray(nbr: number) {
    //this generates an array from the number 1 to the number of pages available
    //it is called after the search function is called and finished
    this.nbrOfPages = [];
    if (nbr == 0) {
      this.nbrOfPages.push(1);
      return
    }
    (nbr != parseInt(nbr.toString())) ? nbr = parseInt(nbr.toString()) + 1 : "";
    for (let i = 1; i <= nbr; i++) {
      this.nbrOfPages.push(i);
    }
  }

  handleSizes(description: any) {
    //this is supposed to return the sizes found in the  description
    let tempSizes: string[] = []
    description.map((Color_array: any) => {
      for (let i = 1; i < Color_array.length; i++) {
        if (tempSizes.indexOf(Color_array[i][0]) == -1)
          tempSizes.push(Color_array[i][0]);
      }
    })
    return tempSizes
  }

  addToCart() {
    //this sends the product info to the backend so it can be added to the database's shoppingCart table
    //it fills a msg that is put on an NgIf condition
    this.userService.addToCart(this.selectedColor, this.selectedSize, this.SelectedPost, this.SelectedQuantity)
      .subscribe({
        next: () => { this.msg = "added Successfully" },
        error: () => { this.msg = "we had a problem while adding product" }
      });
  }

  HandlePagechange(page: number) {
    //when a page number is pressed, this method is called to trigger the search function again
    this.SelectedPage = page;
    if (this._category != null)
      this.search(this._category, this.searchValue, this.filter, this.gender, this.SelectedPage);
  }

  getCategories() {
    //this fill the options of the select tag when the component is rendered
    this.userService.getCategories().subscribe({
      next: (e) => { this.categories = e },
      error: (e) => { this.categories = [e] }
    })
  }

  toggleShowProducts(id: string) {
    //this gets the info for the pressed product on the search page and puts it in the product variable
    //it is called when the + and x buttons are pressed,it toggles the product pop up
    this.SelectedPost = id;
    this.showProduct = !this.showProduct;
    if (this.showProduct) {
      document.body.style.overflowY = 'hidden';
    }
    else {
      document.body.style.overflowY = 'scroll';
    }
    if (this.showProduct) {
      this.userService.getOneProduct(id)
        .subscribe({
          next: (e) => { this.Product = e, this.setColors(this.Product.description), this.setSizes(this.Product.description[0][0]) },
          error: (e) => console.error(e)
        })
    }
    else {
      this.msg = "";
    }

  }
  nthng() { }
  setColors(description: any[]) {
    //this fills the color array with the colors of the new product
    this.colors = []
    description.map((Color_array) => {
      this.colors.push(Color_array[0]);
    })
  }

  setSizes(color: string) {
    //this fills the sizes array with the sizes of the new product
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
    //this is called when a new color is selected
    this.selectedColor = color;
    this.setSizes(color);
  }

  handleChangeSize(size: string) {
    //this is called when a new size is pressed
    this.selectedSize = size;
  }

  handleQtyChange(nbr: number) {
    //this is called when a quantity is chanegd
    this.SelectedQuantity += nbr
  }

  ngOnInit(): void {
    //this gets the parameters (if the exist).
    //and triggers the search function with the parameters set as filters
    this.route.params.subscribe((params: any) => {
      let temp = this.route.snapshot.paramMap.get('cat');
      if (temp) {
        this._category = temp;
      }
      let postId;
      postId = this.route.snapshot.paramMap.get('prodId');
      if (postId != null && postId != 'null') {
        this.toggleShowProducts(postId);
      }
    });
    if (this._category == 'all') {
      this._category = ""
    }
    //it also calls the search and categories functions to get the data when the component is rendered
    this.search(this._category, this.searchValue, this.filter, this.gender, this.SelectedPage);
    this.getCategories()
  }
}