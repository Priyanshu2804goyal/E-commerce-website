import cartmodel from "./cart.model.js";
export class cartcontroller{
    add(req,res){
        const {productid,quantity}=req.query;
        const userid=req.userid;
       cartmodel.add(productid,userid,quantity);
       res.status(201).send('cart is updated');
    }
    get(req,res){
        const user_id=req.userid;
        const items=cartmodel.get(user_id);
        return res.status(200).send(items);
    }
    delete(req,res){
        const user_id=req.userid;
        const cart_id=req.params.id;
        const error=cartmodel.delete(cart_id,user_id);
        if(error){
            res.status(404).send(error);
        }
       return res.status(200).send('cart item is removed');
    }
}