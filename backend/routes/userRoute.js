import express from 'express';
import tokenControl from '../controllers/tokenControl.js';
import userControl from '../controllers/userControl.js';

let app = express();
app.use(express.json());

app.put('/refresh-token', tokenControl.refreshToken)
app.post('/register', userControl.register)
app.get('/all-users', tokenControl.token, userControl.showAllUsers)
app.post('/login', userControl.login)
app.put('/update-one',tokenControl.token, userControl.updateOne)
app.delete('/delete-user',tokenControl.token, userControl.deleteUser)
app.get('/show-info',tokenControl.token, userControl.showInfo)
app.delete('/logout', tokenControl.logout)
app.delete('/remove-one',tokenControl.token, userControl.removeOne)
export default app