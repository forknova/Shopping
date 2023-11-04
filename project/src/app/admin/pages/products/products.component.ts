import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { Product } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  adminId: any = localStorage.getItem("id");
  constructor(private adminService: AdminService, private router: Router) { };
  //data is where all fetched data get stored if it comes back as an array of objects
  data: [{ _id: string, name: string, price: string, description: [] }] = [{ _id: "loading...", name: "loading...", price: "loading...", description: [] }];
  //temp expects either the array of products or a string containing an error message
  temp: [{ _id: string, name: string, price: string, description: [] }] | string = "";
  categories: any = [];
  AddProductresult: boolean = false;
  AddProductresult2: boolean = false;
  addProductToggle: boolean = false;
  DeletedBool: boolean = false;
  colorBools: {
    black: boolean, white: boolean,
    green: boolean,
    blue: boolean,
    red: boolean,
  } = {
      black: false,
      white: false,
      green: false,
      blue: false,
      red: false,
    }

  newProduct: any = []
  black: Product = { color: 'black', s: 0, m: 0, l: 0, xl: 0 };
  blue: Product = { color: 'blue', s: 0, m: 0, l: 0, xl: 0 };
  red: Product = { color: 'red', s: 0, m: 0, l: 0, xl: 0 };
  white: Product = { color: 'white', s: 0, m: 0, l: 0, xl: 0 };
  green: Product = { color: 'green', s: 0, m: 0, l: 0, xl: 0 };
  selectedFile: any;

  //onSearch runs when the component renders and when a person presses on the search button
  Number(input: any) {
    if (isNaN(input)) return '0'
    else return input;
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }
  Add(name: string, category: string, gender: string, price: string, admin: string) {
    if (this.colorBools.black) { this.newProduct.push(this.black) }
    if (this.colorBools.blue) { this.newProduct.push(this.blue) }
    if (this.colorBools.red) { this.newProduct.push(this.red) }
    if (this.colorBools.white) { this.newProduct.push(this.white) }
    if (this.colorBools.green) { this.newProduct.push(this.green) }
    this.adminService.AddProduct(this.newProduct, name, category, gender, price, admin, this.selectedFile)
      .subscribe({
        next: (e) => {
          e ? (this.newProduct = [], this.AddProductresult = true, this.AddProductresult2 = true, this.OnSearch("")) : (this.AddProductresult = true, this.AddProductresult2 = false);
        },
        error: (e) => {
          this.AddProductresult = true; this.AddProductresult2 = false, this.newProduct = [];
        }
      }
      )
  }
  async OnSearch(search: string) {
    this.temp = await this.adminService.getProducts(this.adminId);
    if (typeof this.temp == 'object') {
      this.data = this.temp
    }
  }

  AddCat(cat: string, gender: string) {
    this.adminService.addCat(this.adminId, cat, gender).subscribe({
      next: (e) => { this.getcat(); },
      error: (e) => { alert(e) },
    })
  }

  Addfeatured(id: string) {
    this.adminService.addFeatured(id, this.adminId).subscribe({
      next: (e) => { console.log(e) },
      error: (e) => { console.log(e) },
    })
  }

  getcat() {
    this.adminService.getCategories().subscribe({
      next: (e) => this.categories = e,
      error: (e) => alert("error occured " + e)
    })
  }
  async DeleteProduct(product: string) {
    this.DeletedBool = await this.adminService.deleteProduct(this.adminId, product);
    if (this.DeletedBool) {
      this.data.map((_product) => {
        if (_product._id == product) { this.data.splice(this.data.indexOf(_product), 1); return }
      })
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem("role") != "admin") {
      this.router.navigateByUrl('/login')
    };
    this.OnSearch("");
    this.getcat()
  }
}
