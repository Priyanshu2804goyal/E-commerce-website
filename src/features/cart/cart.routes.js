import express from "express";
import { cartcontroller } from "./cart.controller.js";
 
const cartrouter=express.Router();
const cartscontroller=new cartcontroller();
cartrouter.delete('/:id',(req,res)=>{
    cartscontroller.delete(req,res)});
cartrouter.post('/',(req,res)=>{
    cartscontroller.add(req,res)});
cartrouter.get('/',(req,res)=>{
    cartscontroller.get(req,res)});

export default cartrouter;