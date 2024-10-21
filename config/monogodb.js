/*
import dotenv from "dotenv";
dotenv.config();
*/
import { MongoClient } from "mongodb";
// const url=process.env.Db_url;
// console.log(url);
let client;
 export const connecttomongodb=()=>{
    MongoClient.connect(process.env.Db_url).then(clientInstance=>{
           client=clientInstance;
        console.log("Mongodb is connected");
    }).catch(err=>{
        console.log(err);
    })
}
 export const getDB=()=>{
    return client.db();
 }
