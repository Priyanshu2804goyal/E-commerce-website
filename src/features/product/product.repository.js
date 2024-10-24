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
   async filter(minprice,maxprice,category){
      try{
        const db=getDB();
        const collection=db.collection(this.collection);
        let filterexpression={};
        if(minprice){
            filterexpression.price={$gte:parseFloat(minprice)};
        }
        if(maxprice){
            filterexpression.price={...filterexpression.price,$lte:parseFloat(maxprice)};
        }
        if(category){
            filterexpression.category=category;
        }
         return await collection.find(filterexpression).toArray();
      }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong",500);
      }
   }
   async rate(userid,productid,rating){
      try{
        const db=getDB();
        const collection=db.collection(this.collection);
        // pull the rating-remove existing rating;
        await collection.updateOne({_id:new ObjectId(productid)},{$pull:{ratings:{userid:new ObjectId(userid)}}});
        // push the rating-add new rating;
        await collection.updateOne({_id:new ObjectId(productid)},{$push:{ratings:{userid:new ObjectId(userid),rating}}});
      }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong",500);
      }
   }
}
export default productrepository;