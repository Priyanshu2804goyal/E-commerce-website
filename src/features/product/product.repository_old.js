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
   async filter(minprice,maxprice,categories){
      try{
        const db=getDB();
        const collection=db.collection(this.collection);
        let filterexpression={};
       // console.log(categories);
        if(minprice){
            filterexpression.price={$gte:parseFloat(minprice)};
        }
        if(maxprice){
            filterexpression.price={...filterexpression.price,$lte:parseFloat(maxprice)};
        }
        if (typeof categories === "string") {
          categories=JSON.parse(categories.replace(/'/g,'"'))
        }
        //  console.log(categories);
        if(categories){
            filterexpression={$and:[{category:{$in:categories}},filterexpression]};
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
        throw new applicationerror("something went wrong with database",500);
      }
   }
   async AverageProductPricePerCategory(){
     try{
          const db=getDB();
         return await db.collection(this.collection).aggregate(
             [
                {
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
             ]
          ).toArray();
   }catch(err){
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
   }
}
export default productrepository;