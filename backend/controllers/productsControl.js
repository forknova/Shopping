//products control
// import fs from 'fs'
import productService from '../services/productService.js';

const addProduct = async (req, res) => {
    try {
        console.log(JSON.parse(req.body.data))
        if (req.body && req.body.data) {
        let adminId = req.query.adminId;
        let data = JSON.parse(req.body.data);
        let name = data.name;
        let price = data.price;
        let description = data.description;
        let category = data.category;
        const file = req.file;;
        let size = ['s', 'm', 'l', 'xl'];
        let main = [];
        for (let i = 0; i < description.length; i++) {
            let color = description[i].color;
            let quantity = [description[i].s, description[i].m, description[i].l, description[i].xl];
            let colorEntry = [color];

            for (let j = 0; j < size.length; j++) {
                if (quantity[j] !== 0) {
                    colorEntry.push([size[j], quantity[j]]);
                }
            }

            main.push(colorEntry);
        }

        let added = await productService.addProduct(adminId, name, file, price, main, category);

        if (added === true) {
            res.send(true);
        } else {
            res.send(false);
        }}
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}



const showAllproducts = async (req, res) => {
    try {
    //     let adminId = req.query.adminId
        const products = await productService.getAllProducts();
        if(products.length>0){
            res.send(products)
        }
        else if (products == false){
            res.send(false) //not an admin
        } 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
const showOneProduct = async (req, res) => {
    try {
        let productId = req.query.productId
        const product = await productService.getOneProduct(productId);
        if(product){
            res.send(product);
        }
        else if(product == false){
           res.send(false) //no product with this id
        }

    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
}

const removeProduct = async (req, res) => {
    try {
        let adminId = req.query.adminId
        let productId = req.query.productId
        let removed = await productService.removeProduct(adminId, productId)
        if (removed) {
            res.send(true)
        }
        else if (removed == false) {
            res.send(false) //not an admin
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


}

const editProduct = async (req, res) => {
    try {
        let adminId = req.query.adminId
        let productId = req.query.productId
        let name = req.body.name;
        let description = req.body.description;
        let size = ['s', 'm', 'l', 'xl'];
        let main = [];

        for (let i = 0; i < description.length; i++) {
            let color = description[i].color;
            let quantity = [description[i].s, description[i].m, description[i].l, description[i].xl];
            let colorEntry = [color];

            for (let j = 0; j < size.length; j++) {
                if (quantity[j] !== 0) {
                    colorEntry.push([size[j], quantity[j]]);
                }
            }

            main.push(colorEntry);
        }
        let price = req.body.price;
        let category = req.body.category
        let updated = await productService.editProduct(adminId, productId, name, price, main, category)
        if (updated) {
            res.send(true)
        }
        else if (updated == false) {
            res.send(false)
        }
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const searchProduct = async (req, res) => {
    try {
        let page = req.query.page
        let search = req.query.searchField;
        let gender = req.query.gender;
        let type = req.query.type;
        let sort = req.query.sort;
        let find = await productService.searchProduct(gender, type, search, sort, page)
        console.log(find)
        if (find.length > 0) {
            // console.log(find)
            res.send(find)
        }
        else {
            res.send(false)
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

// const checkquantity = async(req,res) => {
//     let productId= req.query.productId;
//     let alo = await productService.checkquantity(productId);
//     return alo}


// const getPages = async (numb) => {
//     let count = (numb-1) *12
//     for (let i =0 ; i>count ; i++)
// }




export default {
    addProduct,
    removeProduct,
    showAllproducts,
    editProduct,
    searchProduct,
    showOneProduct

}