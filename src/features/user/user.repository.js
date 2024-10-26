import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
const usermodel=mongoose.model('User',userSchema);
export default class userrepository{
   async signup(user){
      try{
          const newuser=new usermodel(user);
          await newuser.save();
          return newuser;
      }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
   }
    async signin(email,password){
        try{
          return await usermodel.findOne({email,password});
        }catch(err){
            console.log(err);
            throw new applicationerror("something went wrong with database",500);
          }
    }
    async findbyemail(email){
        // 1.get the database;
        try{
       return  await usermodel.findOne({email});
     }catch(err){
         console.log(err);
        throw new applicationerror("something went wrong",500);
     }
    }

}