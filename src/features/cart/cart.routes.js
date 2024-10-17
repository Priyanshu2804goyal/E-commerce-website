import express from "express";
import { cartcontroller } from "./cart.controller.js";
 
const cartrouter=express.Router();
const cartscontroller=new cartcontroller();
cartrouter.delete('/:id',cartscontroller.delete);
cartrouter.post('/',cartscontroller.add);
cartrouter.get('/',cartscontroller.get);

export default cartrouter;