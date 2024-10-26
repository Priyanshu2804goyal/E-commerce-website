/*
import dotenv from "dotenv";
dotenv.config();
*/
import { MongoClient } from "mongodb";
// import { client } from "winston/lib/winston/config.js";
// const url=process.env.Db_url;
// console.log(url);
let client;
 export const connecttomongodb=()=>{
    MongoClient.connect(process.env.Db_url).then(clientInstance=>{
           client=clientInstance;
        console.log("Mongodb is connected");
        createcounter(client.db());
        createindexes(client.db());
    }).catch(err=>{
        console.log(err);
    })
}
 export const getclient=()=>{
    return client;
 }
 export const getDB=()=>{
    return client.db();
 }
 const createcounter=async(db)=>{
    const existingcounter= await db.collection("counters").findOne({_id:'cartitemid'});
    if(!existingcounter){
        await db.collection("counters").insertOne({_id:'cartitemid',value:0});
    }

 }
 // create mongodb indexes;
 const createindexes=async(db)=>{
    try{
        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});
    }catch(err){
        console.log(err);
    }
    console.log('Indexes are created');
 }
