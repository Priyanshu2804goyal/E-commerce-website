import express from "express";
import productcontroller from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
// query product for filter=http://localhost:4400/api/product/filter?minprice=10&maxprice=20&category=category1

const productrouter=express.Router();
const productscontroller=new productcontroller;
productrouter.get('/',(req,res)=>{
    productscontroller.getallproduct(req,res)});
productrouter.post('/rate',productscontroller.rateproduct);
productrouter.get('/filter',productscontroller.filterproduct);
productrouter.post('/addproduct',upload.single('imageurl'),(req,res)=>{
   productscontroller.addproduct(req,res)});
productrouter.get('/:id',(req,res)=>{
 productscontroller.getoneproduct(req,res)});
export default productrouter;