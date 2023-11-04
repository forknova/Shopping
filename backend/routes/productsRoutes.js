import express from 'express';
import productControl from '../controllers/productsControl.js';
import multer from 'multer';
let app = express();
app.use(express.json());


// Set up multer for handling file uploads
const upload = multer({ dest: 'public/product-images' });


app.use(express.static('public'));

app.post('/addProduct', upload.single('file'), productControl.addProduct);
app.get('/allProducts', productControl.showAllproducts)
app.delete('/removeProduct', productControl.removeProduct)
app.put('/editProduct', productControl.editProduct)
app.get('/search', productControl.searchProduct)
app.get('/get-one-product', productControl.showOneProduct)

export default app



