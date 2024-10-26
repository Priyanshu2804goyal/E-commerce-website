import { getDB } from "../../../config/monogodb.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
class userrepository{
   constructor(){
    this.collection="users";
   }
    async signup(newuser){
        // 1.get the database;
        try{
        const db=getDB();
        // 2.get the collection;
        const collection=db.collection(this.collection);
        //3.insert in document;
       await collection.insertOne(newuser);
       return newuser;
     }catch(err){
        throw new applicationerror("something went wrong",500);
     }
    }
    async findbyemail(email){
        // 1.get the database;
        try{
        const db=getDB();
        // 2.get the collection;
        const collection=db.collection(this.collection);
        //3.insert in document;
       return  await collection.findOne({email});
     }catch(err){
        throw new applicationerror("something went wrong",500);
     }
    }
}
export default userrepository;