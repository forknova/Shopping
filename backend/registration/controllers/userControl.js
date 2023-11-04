import bcrypt from 'bcrypt';
import userService from '../services/registrationservice.js';
const register = async (req,res) => {
    const { fullname, email, password } = req.body;
  
    try {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
     
          const success = await userService.register(fullname, email, hash);
          
          if(success == "done"){
          res.status(201).send(true);}
          else if (success == "email already used"){
            
              res.send(false)
          }
          else{
              res.status(500);
          }
       
    } catch (e) {
        console.log(e);
        res.status(500).send('Error');
    }

};

const showAllUsers = async(req,res) => {
   
   try{
    
      let id = req.params.id;
        
        let done = await userService.isAdmin(id)
        if(done == true){
         
            res.status(200).send(await userService.getAllUsers())
        }
        else if (done == false){
           
            res.status(403).send("you can't see")//not an admin
        }
        else {
            
            res.status(500).send("error server") // error from server
        }
    
}
catch (e) {
    console.log(e);
    res.status(500).send('Error');
}
}




export default {
register,
showAllUsers
};