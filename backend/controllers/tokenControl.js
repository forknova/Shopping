import tokenService from "../services/tokenService.js"
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken"
const token = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const Token = authHeader && authHeader.split(' ')[1];
    if (Token== null) return res.sendStatus(401);
    jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
    next()
    })
}

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.token;
        console.log(refreshToken+"TEST")

        if (!refreshToken) {
           res.status(400).send({ error: 'Refresh token is missing' });
        }
        const access = await tokenService.refreshToken(refreshToken);

        if (access === "403") {
             res.sendStatus(403);
        }
        else
{
        res.send(access);}
    } catch (error) {
        console.error('Error in refreshToken middleware:', error);
        res.status(500).send("TESTOOOOOOOO");
    }
};

const logout = async (req,res)=>{
    try{
        let token = req.body.token;
        if(token){
        let logout = tokenService.logout(token)
        if(logout) res.send(true)
    }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}
export default {
token,
logout,
refreshToken
}