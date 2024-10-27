import express from "express";
import usercontroller from "./user.controller.js";
import jwtauth from "../../middlewares/jwt.middleware.js";
// query product for filter=http://localhost:4400/api/product/filter?minprice=10&maxprice=20&category=category1

const userrouter=express.Router();
const userscontroller=new usercontroller();

userrouter.post('/signin',(req,res,next)=>
    {userscontroller.signin(req,res,next);
    });
userrouter.post('/signup',(req,res,next)=>{
    userscontroller.signup(req,res,next);
});
userrouter.put('/resetpassword',jwtauth,(req,res)=>{
     // console.log('using api');
     userscontroller.resetpassword(req,res);
});
export default userrouter;