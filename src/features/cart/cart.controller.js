import cartmodel from "./cart.model.js";
import cartrepository from "./cart.repository.js";
export class cartcontroller{
    constructor(){
        this.cartitemsrepository=new cartrepository;
    }
    async add(req,res){
        try{
        const {productid,quantity}=req.body;
       //  console.log(quantity);
        const userid=req.userid;
       await this.cartitemsrepository.add(productid,userid,quantity);
          res.status(201).send('cart is updated');
        }catch(err){
            console.log(err);
            throw new applicationerror("something went wrong",500);
          }
    }
    async get(req,res){
        const user_id=req.userid;
        const items=await this.cartitemsrepository.get(user_id);
        return res.status(200).send(items);
    }
    async delete(req,res){
        const user_id=req.userid;
        const cart_id=req.params.id;
        const deleted= await this.cartitemsrepository.delete(cart_id);
        if(!deleted){
            res.status(404).send(deleted);
        }
       return res.status(200).send('cart item is removed');
    }
}