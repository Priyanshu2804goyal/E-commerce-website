import mongoose from "mongoose";
export const cartschema=new mongoose.Schema({
    productid:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    quantity:Number
})