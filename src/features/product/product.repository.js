import { getDB } from "../../../config/monogodb.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
import { ObjectId } from "mongodb";

class productrepository{
    constructor(){
        this.collection="products";
    }
   async add(newproduct){
    try{
        // 1.get the db;
        const db=getDB();
        // 2.get the collection;
        const collection=db.collection(this.collection);
       await  collection.insertOne(newproduct);
        return newproduct;

    }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong",500);
    }
   }
   async getall(){
      try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.find().toArray();
       }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong",500);
      }
   }
   async get(id){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.findOne({_id:new ObjectId(id)});
       }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong",500);
      }
   }
}
export default productrepository;