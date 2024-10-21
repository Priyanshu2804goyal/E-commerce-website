import { getDB } from "../../../config/monogodb.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
export default class usermodel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }
    /*
     static async signup(name,email,password,type){
        // 1.get the database;
        try{
        const db=getDB();
        // 2.get the collection;
        const collection=db.collection("users");
        const newuser=new usermodel(name,email,password,type);
        //3.insert in document;
       await collection.insertOne(newuser);
       return newuser;
     }catch(err){
        throw new applicationerror("something went wrong",500);
     }
    }
     */
    /*
    static signin(email,password){
        const user_result=user.find((u)=>u.email==email && u.password==password);
        return user_result;
    }
        */
    static getall(){
        return user;
    }

}

var user=[
    {
        id:1,
        name:"seller user",
        email:"seller@ecom.com",
        password:"password",
        type:"seller",
    },
    {
        id:2,
        name:"customer user",
        email:"customer@ecom.com",
        password:"password",
        type:"customer",
    }
]