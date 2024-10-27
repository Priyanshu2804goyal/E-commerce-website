
import mongoose from "mongoose";
export const productschema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    inStock:Number,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'reviews'
        }
    ]
})