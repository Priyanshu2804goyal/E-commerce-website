import express from "express";
import usercontroller from "./user.controller.js";
// query product for filter=http://localhost:4400/api/product/filter?minprice=10&maxprice=20&category=category1

const userrouter=express.Router();
const userscontroller=new usercontroller;

userrouter.post('/signin',(req,res)=>
    {userscontroller.signin(req,res);
    });
userrouter.post('/signup',(req,res)=>{
    userscontroller.signup(req,res);
});
export default userrouter;