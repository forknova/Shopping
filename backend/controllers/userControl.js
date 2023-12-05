import bcrypt from 'bcrypt';
import userService from '../services/userService.js';
import dotenv from 'dotenv';
dotenv.config();

const register = async (req,res) => {
try{
    const { fullname, email, password } = req.body;
        console.log( fullname, email, password)
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);  
        const hash = bcrypt.hashSync(password, salt); 
  
          const success = await userService.register(fullname, email, hash);
      
          if(success){
          res.send(true);}
          else if (success== false){
             res.send(false) //already used
          }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
};







const login = async (req,res) => {
try{
        let email= req.body.email
        let password = req.body.password
        console.log(password)
        
        let available = await userService.availableUser(email, password) //id taba3 l person
      
        if(available){
          res.json(available)
        }
        else if (available == false){
            res.status(406).send(false) // wrong email or password
           
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

const showAllUsers = async (req, res) => {
    try {
        // Extract user information from the token
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const isAdmin = await userService.isAdmin(user.userId);

        if (isAdmin) {
            const users = await userService.getAllUsers(user.userId);

            if (users) {
                res.send(users);
            } else {
                res.send({ result: 'user array is empty' });
            }
        } else {
            res.send(false);//not an admin
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



 const deleteUser = async(req, res) => {

    try{
        const admin = req.user;


        if(admin){
         let userId = req.query.userId
         if(userId){
         let isAdmin = await userService.isAdmin(admin.userId)
         if(isAdmin) {
         let deleted = await userService.deleteUser(userId)
         if(deleted){
             res.send(true)
             }
         
         else if(deleted == false){
             res.send(false) //no user with this id
         }
        } else{
            res.send(false) //not an admin
        }
         }}
         else if (!admin) {
             return res.status(401).json({ error: 'Unauthorized' });
         }}
         catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    const showInfo = async(req, res) => {

        try{
            const user = req.user;
            if (user) {
            let info = await userService.showInfo(user.userId);
            console.log(info)
             if(info){
                res.send(info) 
             }
             else if( info == false){
                res.send(false)
             }
            }

        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        }  catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
        
    }

    const removeOne = async(req, res) => {

        try{
            const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
            let deleted = userService.deleteUser(user.userId);
            if(deleted){
                res.send(true)
            }
            else if (deleted == false){
                res.send(false)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
       
    const updateOne = async(req, res) => {

        try{
            const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
            let email = req.body.email;
            let password = req.body.password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);  
            const hash = bcrypt.hashSync(password, salt); 
            console.log(hash)
            let updated = await userService.editUser(user.userId,email,hash)
            if(updated){
                res.send(true)
            }
            else if (updated == false) {
                res.send(false) 
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }


   




export default {
register,
showAllUsers,
login,
deleteUser,
showInfo,
removeOne,
updateOne
};