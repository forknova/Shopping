import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ColorsBoolean, Product, colorData, data } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  imgFolder: string = 'http://localhost:4000/';
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    gender: ['', Validators.required],
    price: ['', Validators.required]
  });
  data: data[] = [{ _id: "loading...", name: "loading...", price: "loading...", description: [], img: "" }];
  temp: data[] | string = "";
  categories: string[] | any = [];
  selectedFile: any;
  newProduct: Product[] = [];
  AddProductresult: boolean = false;
  AddProductresult2: boolean = false;
  addProductToggle: boolean = false;
  colorBools: ColorsBoolean = {
    black: false, white: false, green: false, blue: false, red: false
  };
  colorData: colorData = {
    black: { color: 'black', s: 0, m: 0, l: 0, xl: 0 },
    blue: { color: 'blue', s: 0, m: 0, l: 0, xl: 0 },
    red: { color: 'red', s: 0, m: 0, l: 0, xl: 0 },
    white: { color: 'white', s: 0, m: 0, l: 0, xl: 0 },
    green: { color: 'green', s: 0, m: 0, l: 0, xl: 0 }
  };
  //edit product variables
  EditedproductForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    gender: ['', Validators.required],
    price: ['', Validators.required]
  });
  EditProductId: string = "";
  EditedProduct: Product[] = [];
  editProductresult: boolean = false;
  editProductresult2: boolean = false;
  editProductToggle: boolean = false;
  colorEditData: colorData = {
    black: { color: 'black', s: 0, m: 0, l: 0, xl: 0 },
    blue: { color: 'blue', s: 0, m: 0, l: 0, xl: 0 },
    red: { color: 'red', s: 0, m: 0, l: 0, xl: 0 },
    white: { color: 'white', s: 0, m: 0, l: 0, xl: 0 },
    green: { color: 'green', s: 0, m: 0, l: 0, xl: 0 }
  };
  EditcolorBools: ColorsBoolean = {
    black: false, white: false, green: false, blue: false, red: false
  };
  //edit product variables
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }
  fetchData() {
    //get all products and puts them in data array
    this.adminService.getProducts().subscribe({
      next: (res: any) => {
        if (res == false) {
          this.temp = "access denied";
        } else {
          this.temp = res;
        }
        if (typeof this.temp == 'object') {
          this.data = this.temp;
          console.log(this.data)
        }
      },
      error: (e) => {
        this.temp = "error " + e;
      }
    });
  }

  fetchCategories() {
    //get all categories and puts them in options of a select
    this.adminService.getCategories().subscribe({
      next: (e) => {
        this.categories = e;
      },
      error: (e) => console.error("Error occurred while fetching categories: ", e)
    });
  }

  onFileUpload(event: any) {
    //when the input of type file is changed, this function is called to 
    //store the file inside of the selectedFile variable
    this.selectedFile = event.target.files[0];
  }

  addColors() {
    //this is called before we call the addProduct service
    //this function adds the selected colors information into the newProduct array
    this.newProduct = [];
    if (this.colorBools.black) { this.newProduct.push(this.colorData.black); }
    if (this.colorBools.blue) { this.newProduct.push(this.colorData.blue); }
    if (this.colorBools.red) { this.newProduct.push(this.colorData.red); }
    if (this.colorBools.white) { this.newProduct.push(this.colorData.white); }
    if (this.colorBools.green) { this.newProduct.push(this.colorData.green); }
  }
  addEditColors() {
    //this is called before we call the addProduct service
    //this function adds the selected colors information into the newProduct array
    this.EditedProduct = [];
    if (this.EditcolorBools.black) { this.EditedProduct.push(this.colorEditData.black); }
    if (this.EditcolorBools.blue) { this.EditedProduct.push(this.colorEditData.blue); }
    if (this.EditcolorBools.red) { this.EditedProduct.push(this.colorEditData.red); }
    if (this.EditcolorBools.white) { this.EditedProduct.push(this.colorEditData.white); }
    if (this.EditcolorBools.green) { this.EditedProduct.push(this.colorEditData.green); }
  }


  Add() {
    //this function gets all the data and sends them to the addProduct service
    //then if the request is successfull, it adds the new product to the Products table 
    if (this.productForm.valid && this.selectedFile) {
      this.addColors();
      this.adminService.AddProduct(
        this.newProduct,
        this.productForm.value.name,
        this.productForm.value.category,
        this.productForm.value.gender,
        this.productForm.value.price,
        this.selectedFile
      ).subscribe({
        next: (e) => {
          e ? (this.newProduct = [], this.AddProductresult = true,
            this.AddProductresult2 = true,
            this.fetchData()) : (this.AddProductresult = true, this.AddProductresult2 = false);
        },
        error: (e) => {
          this.newProduct = [];
          this.AddProductresult = true;
          this.AddProductresult2 = false;
          console.error(e)
        }
      });
    }
  }

  edit() {
    //this function gets all the data and sends them to the addProduct service
    //then if the request is successfull, it adds the new product to the Products table
    console.log(this.EditedproductForm.value.name,
      this.EditedproductForm.value.category,
      this.EditedproductForm.value.gender,
      this.EditedproductForm.value.price)
    if (this.EditedproductForm.valid) {
      this.addEditColors();
      console.log(this.EditcolorBools)
      console.log(this.EditedProduct)
      this.adminService.EditProduct(
        this.EditProductId,
        this.EditedProduct,
        this.EditedproductForm.value.name,
        this.EditedproductForm.value.category,
        this.EditedproductForm.value.gender,
        this.EditedproductForm.value.price
      ).subscribe({
        next: (e) => {
          e ? (this.EditedProduct = [], this.editProductresult = true,
            this.editProductresult2 = true,
            this.fetchData()) : (this.editProductresult = true, this.editProductresult2 = false);
        },
        error: (e) => {
          this.EditedProduct = [];
          this.editProductresult = true;
          this.editProductresult2 = false;
          console.error(e)
        }
      });
    }
  }

  toggleEdit(id?: any) {
    if (id) {
      this.editProductToggle = !this.editProductToggle;
      this.EditProductId = id
    }
    else {
      this.editProductToggle = !this.editProductToggle
    }
  }

  AddCat(cat: string, gender: string) {
    //this adds a category to the database
    //and then fills the categories array again
    this.adminService.addCat(cat, gender).subscribe({
      next: (e) => { this.fetchCategories(); },
      error: (e) => console.error("Error occurred while adding category: ", e),
    });
  }

  Addfeatured(id: string) {
    //this adds a product to the featured products table in the database
    //these products are shown on the homepage
    this.adminService.addFeatured(id).subscribe({
      next: (e) => { console.log(e); },
      error: (e) => console.error("Error occurred while adding featured item: ", e),
    });
  }

  DeleteProduct(product: string) {
    //this deleted a product from the backend,
    //and then removes it from the products array
    this.adminService.deleteProduct(product).subscribe({
      next: (res: any) => {
        if (res == true) {
          this.data.map((_product) => {
            if (_product._id == product) { this.data.splice(this.data.indexOf(_product), 1); return; }
          });
        }
      },
      error: (e) => console.error("Error occurred while deleting product: ", e)
    });
  }
  ngOnInit(): void {
    //we get all data and categories when the component renders
    this.fetchData();
    this.fetchCategories();
  }
}
