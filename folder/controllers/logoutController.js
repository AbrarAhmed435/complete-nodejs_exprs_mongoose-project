const User=require('../model/User');

const fsPromises=require('fs').promises;
const path=require('path');

const handleLogout= async (req,res)=>{
    //Note:on Client, also delete the accessToken i.e., Frontend

   const cookies=req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204); // Successful but No content
    const refreshToken=cookies.jwt;

    //Is refresh Token in DB
    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true});  
        return res.sendStatus(204);
    } 

    //Delete the refreshtoken in Database
  foundUser.refreshToken='';
  const result =await foundUser.save();
  console.log(result);

    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});// secure:true - only serves on https
    res.sendStatus(204);
}

module.exports={handleLogout}