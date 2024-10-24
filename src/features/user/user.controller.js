import usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
import userrepository from "./user.repository.js";
import bcrypt from 'bcrypt';
export default class usercontroller{
    constructor(){
        this.usersrepository=new userrepository();
    }
    async signup(req,res){
        const {name,email,password,type}=req.body;
        const hashedpassword= await bcrypt.hash(password,12);
        const user= await new   usermodel(name,email,hashedpassword,type);
        await this.usersrepository.signup(user);
       return res.status(201).send(user);
    }
    async signin(req,res,next){
        try{
         const user=await this.usersrepository.findbyemail(req.body.email);
       if(!user){
        return res.status(400).send('incorrect credentials');
       }else{
           const result=await bcrypt.compare(req.body.password,user.password);
           if(result){
                 // 1.create token
            const token=jwt.sign({userid:user._id,email:user.email},process.env.jWT_secret,{expiresIn:"1h"});
            // 2.send token;
            return res.status(200).send(token);
           }else{
            return res.status(400).send('incorrect credentials');
           }
       }
     }catch(err){
        console.log(err);
        return res.status(401).send("something went wrong");
     }
    }
}