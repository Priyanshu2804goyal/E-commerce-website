import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url=process.env.Db_url;
export const connectusingmongoose=async()=>{
    try{
      await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
       console.log("Mongodb using moongose is connected");
    }catch(err){
        console.log(err);
    }
}
