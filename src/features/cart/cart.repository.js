import { ObjectId, ReturnDocument } from "mongodb";
import { getclient, getDB } from "../../../config/monogodb.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
export default class cartrepository{
    constructor(){
        this.collection="cartitems";
    }

   async add(productid,userid,quantity){
     try{
        const db=getDB();
     const collection=db.collection(this.collection);
     const id= await this.getnextcounter(db);
      // console.log(id);
     // find the document;
     // insert or delete the document;
     if (!ObjectId.isValid(productid) || !ObjectId.isValid(userid)) {
        throw new applicationerror("Invalid productid or userid format. Must be a 24-character hex string.");
      }
      await collection.updateOne(
        {productid:new ObjectId(productid),userid:new ObjectId(userid)},
        {  $setOnInsert:{
            _id:id
        },
            $inc:{
            quantity:quantity
        }},
         {
            upsert:true
         }
    );
     }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
   }
    async get(userid){
      try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.find({userid:new ObjectId(userid)}).toArray();
     }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
  }
   async delete(cartitemid){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);

        const result=await collection.deleteOne({_id:new ObjectId(cartitemid)});
        // console.log(result);
         return result.deletedCount>0;
    }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
 }
 async getnextcounter(db){
   const resultdocument=await db.collection("counters").findOneAndUpdate(
    {_id:'cartitemid'},
    {$inc:{value:1}},
    {returnDocument:'after'}
   );
   
    console.log(resultdocument);
   // console.log(resultdocument.value);
    return resultdocument.value;
     // Access the 'value' field in the updated document
  } 
}