import express from "express";
import usercontroller from "./user.controller.js";
// query product for filter=http://localhost:4400/api/product/filter?minprice=10&maxprice=20&category=category1

const userrouter=express.Router();
const userscontroller=new usercontroller;

userrouter.post('/signin',userscontroller.signin);
userrouter.post('/signup',userscontroller.signup);
export default userrouter;