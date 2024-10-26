import express from "express";
import ordercontroller from "./order.controller.js";
//2.instialise express router;
const orderrouter=express.Router();
const  orderscontroller=new ordercontroller();

orderrouter.post("/",(req,res)=>{
    orderscontroller.placeorder(req,res);
})
export default orderrouter;