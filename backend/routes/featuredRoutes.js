import express from 'express';

import featuredControl from '../controllers/featuredControl.js';
let app = express();
app.use(express.json());

  
app.get('/get-featured', featuredControl.getFeatured)
app.post('/add-featured', featuredControl.addToFeatured)
app.delete('remove-featured', featuredControl.removeOne)
export default app