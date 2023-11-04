import bcrypt from 'bcrypt';
import userService from '../services/userService.js';
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
        let email= req.query.email
        let password = req.query.password
        console.log(password)
        
        let available = await userService.availableUser(email, password) //id taba3 l person
      
        if(available!=false){
            if(await userService.isAdmin(available)){
                
                res.send({"result":"A", "id":available}) //this is an admin
               
            }
            else{
                res.send({"result":"U", "id":available}) //this is a user
             
            }
        }
        else if (available == false){
            res.send(false) // wrong email or password
           
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

const showAllUsers = async(req,res) => {

     try{
       let id = req.query.id;
      
         let done = await userService.isAdmin(id)
        
        
         if(done == true || done == 'main admin'){
          let users = await userService.getAllUsers(id)
          if(users){
            res.send(users)
          }
          else{
            res.send({"result":"user array is empty"})
          }
            
           
         }
         else if (!done){
            res.send(false) 
         }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
 }


 const deleteUser = async(req, res) => {

    try{
        
         let adminId= req.query.adminId
         let userId = req.query.userId
         if(userId && adminId){
         let isAdmin = await userService.isAdmin(adminId)
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
         catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    const showInfo = async(req, res) => {

        try{
            let userId = req.query.userId;
            let info = userService.showInfo(userId);
             if(info){
                return info
             }
             else if( info == false){
                return false
             }
        }  catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
        
    }

    const removeOne = async(req, res) => {

        try{
            let userId = req.query.userId;
            let deleted = userService.deleteUser(userId);
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
            let userId = req.body.userId;
            let email = req.body.email;
            let password = req.body.password;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);  
            const hash = bcrypt.hashSync(password, salt); 
            let updated = await userService.editUser(userId,email,hash)
            if(updated){
                res.send(true)
            }
            else if (updated == false) {
                res.send(false) //no user with this id
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