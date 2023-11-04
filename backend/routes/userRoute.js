import express from 'express';

import userControl from '../controllers/userControl.js';
let app = express();
app.use(express.json());

  
app.post('/register',  userControl.register)
app.get('/allUsers', userControl.showAllUsers)
app.get('/login', userControl.login)
app.put('/update-one', userControl.updateOne)
app.delete('/deleteUser', userControl.deleteUser)
app.get('/show-info', userControl.showInfo)
export default app