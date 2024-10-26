import { ObjectId } from "mongodb";
import { getclient, getDB } from "../../../config/monogodb.js";
import ordermodel from "./order.model.js";

export default class orderrepository{
   constructor(){
     this.collection="orders";
   }
   async placeorder(userid){
     // 1.get caritems and calculate total amount;
     const client=getclient();
     const session=client.startSession();
      try{
       const db=getDB();
       session.startTransaction();
        const items=await this.gettotalamount(userid);
         // console.log(items);
         const finaltotalamount=items.reduce((acc,items)=>acc+items.totalamounts,0);
         console.log(finaltotalamount);
     //2. create a new record;
     const neworder=new ordermodel(new ObjectId(userid),finaltotalamount,new Date());
       await db.collection(this.collection).insertOne(neworder,{session});
     //3.Reduce the stock;
      for(let item of items){
         await db.collection("products").updateOne(
            {_id:item.productid},
            {$inc:{stock:-item.quantity}},{session}
         )
      }
     //4.clear the cart items;
      await db.collection("cartitems").deleteMany({
        userid:new ObjectId(userid)
      },{session});
       session.commitTransaction();
       session.endSession();
     }catch(err){
         await session.abortTransaction();
         session.endSession();
        console.log(err);
        throw new applicationerror("something went wrong with database",500);
      }
   }
    async gettotalamount(userid,session){
        const db=getDB();
      const items=await db.collection("cartitems").aggregate(
            [
                 // 1.get cart item for the user;
                 {
                    $match:{userid:new ObjectId(userid)}
                 },
                 //2.get the product from product collection;
                 {
                    $lookup:{
                        from:"products",
                        localField:"productid",
                        foreignField:"_id",
                        as:"productinfo"
                    }
                 },
                 // 3.Unwind the productinfo;
                 {
                    $unwind:"$productinfo"
                 },
               // 4.calculate totalamount for each cartitems;
                 {
                    $addFields:{
                        "totalamounts":{
                            $multiply:["$productinfo.price","$quantity"]
                        }
                    }
                 }
           ],{session}
        ).toArray();
          return items;
    }

}