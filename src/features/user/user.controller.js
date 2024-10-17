import usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class usercontroller{
    signup(req,res){
        const {name,email,password,type}=req.body;
        const user=usermodel.signup(name,email,password,type);
       return res.status(201).send(user);
    }
    signin(req,res){
        const result=usermodel.signin(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send('incorrect credentials');
        }
        else{
            // 1.create token
            const token=jwt.sign({userid:result.id,email:result.email},"pOgYMaNE8o",{expiresIn:"1h"});
            // 2.send token;
            return res.status(200).send(token);
        
        }
    }
}