import "./env.js"
import express from "express";
import swagger from "swagger-ui-express";
import productrouter from "./src/features/product/product.routes.js";
import userrouter from "./src/features/user/user.routes.js";
import basicauthorizer from "./src/middlewares/basicauth.middleware.js";
import jwtauth from "./src/middlewares/jwt.middleware.js";
import cartrouter from "./src/features/cart/cart.routes.js";
import bodyParser from "body-parser";
import apidocs from "./swagger3.0.json" assert {type:'json'};
import loggermiddleware from "./src/middlewares/logger.middleware.js";
import { applicationerror } from "./errorhandler/applicationerror.js";
import {connecttomongodb} from "./config/monogodb.js";
import cors from 'cors';
import orderrouter from "./src/features/order/order.routes.js";
import { connectusingmongoose } from "./config/mongooseconfig.js";
import mongoose from "mongoose";
// error handler middleware;
const server=express();
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }
    if(err instanceof applicationerror){
        return res.status(err.code).send(err.message);
    }
   return res.status(500).send('something went wrong try again later');
})
server.use(bodyParser.json());
server.use(loggermiddleware);
server.use('/api/order/',jwtauth,orderrouter);
server.use('/api-docs/',swagger.serve,swagger.setup(apidocs));
server.use('/api/cart/',loggermiddleware,jwtauth,cartrouter);
server.use('/api/product/',jwtauth,productrouter);
server.use('/api/user/',userrouter);
server.get('/',(req,res)=>{
    res.send('Welcome to E-commerce website');
})
// middleware for handle 404,
server.use((req,res)=>{
    res.send('Api not found please check again the link localhost:5300/api-docs');
})
server.listen(5300,()=>{
    console.log('Server run at 5300');
   // connecttomongodb();
   connectusingmongoose();
})
// cors policy using library;
/*
   var coroptions={
     origin:'http://localhost:6000'
   }
   server.use(cors(coroptions));
*/
// cors policy without using library;
/*
server.use((req,res,next)=>{
     res.header('Access-Control-Allow-Origin','http://localhost:6000');
     // here used client code;
     res.header('Access-Control-Allow-Headers','*');
     res.header('Access-Control-Allow-Methods','*');
     // if oK for preflight request;
     if(req.method=="OPTIONS"){
        return res.sendStatus(200);
     }
     next();
})
*/