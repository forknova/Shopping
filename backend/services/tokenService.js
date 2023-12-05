import mongoose, { set } from "mongoose";
import tokenSchema from '../model/RefreshTokenSchema.js';
import jwt from "jsonwebtoken"

const RefreshTokens = mongoose.model('RefreshTokens', tokenSchema );
import  Connection  from "../connection.js" ;

function generateAccessToken(user) {
    return jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
  }
  function generateRefreshToken(user) {
    return jwt.sign({ userId: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }
  
const refreshToken = async (refreshToken) => {
  try {
    const existingToken = await RefreshTokens.findOne({ token: refreshToken });

    if (!existingToken) {return ("403")
      // or return: { error: "Refresh token not found or expired" };
    }

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the user is valid (optional, depending on your use case)

    const accessToken = generateAccessToken(user);   
    const newRefreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken: newRefreshToken };

  } catch (e) {
    console.error("Error in refreshToken middleware:", e.message);
    throw e;
  }
};


  
    const logout = async (refreshToken) => {
        try {
          await RefreshTokens.deleteOne({ token: refreshToken });
          return  true ;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      
    export default {
        refreshToken,
        generateAccessToken,
        logout
    }