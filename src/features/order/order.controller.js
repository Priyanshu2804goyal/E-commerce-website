import orderrepository from "./order.repository.js";

export default class ordercontroller{
  constructor(){
    this.ordersrepository=new orderrepository();
  }
  async placeorder(req,res){
    try{
         const userid=req.userid;
         await this.ordersrepository.placeorder(userid);
         res.status(201).send("order is created");
    }catch(err){
    console.log(err);
    return res.status(401).send("something went wrong");
  }
  }


}