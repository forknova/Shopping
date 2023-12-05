import express from 'express';
import productControl from '../controllers/productsControl.js';

import tokenControl from '../controllers/tokenControl.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Console } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '../public'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/add-product',tokenControl.token, upload.single('file'), productControl.addProduct);
app.get('/all-products', tokenControl.token,productControl.showAllproducts);
app.delete('/remove-product',tokenControl.token, productControl.removeProduct);
app.put('/edit-product', tokenControl.token, productControl.editProduct);
app.get('/search', tokenControl.token, productControl.searchProduct);
app.get('/get-one-product', tokenControl.token, productControl.showOneProduct);

export default app;
