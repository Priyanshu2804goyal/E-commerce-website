import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
const usermodel=mongoose.model('User',userSchema);
export default class userrepository{
   async signup(user){
      try{
          const newuser=new usermodel(user);
          await newuser.save();
          return newuser;
      }catch(err){
        console.log(err);
        if(err instanceof mongoose.Error.ValidationError){
          throw err;
        }else{
        throw new applicationerror("something went wrong with database",500);
        }
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
    async resetpassword(userid,newpassword){
      try{
        const user= await usermodel.findById(userid);
        if(user){
             user.password=newpassword;
             user.save();
        }else{
          throw new error('user not found');
        }
    }catch(err){
      console.log(err);
     throw new applicationerror("something went wrong",500);
   }
  }
}