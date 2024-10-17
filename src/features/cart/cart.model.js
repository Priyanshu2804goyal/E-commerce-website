export default class cartmodel{
    constructor(productid,userid,quantity,id){
        this.productid=productid;
        this.userid=userid;
        this.quantity=quantity;
        this.id=id;
    }
     static add(productid,userid,quantity){
        const cartitem=new cartmodel(productid,userid,quantity);
        cartitem.id=cartitems.length+1;
        cartitems.push(cartitem);
        // console.log(cartitems.length);
        return cartitem;
    }
    static get(userid){
      return cartitems.filter((i)=>i.userid==userid);
    }
    static delete(cartitemid,user_id){
        const cartindex=cartitems.findIndex((i)=>i.id==cartitemid && i.userid==user_id);
        if(!cartindex==-1){
            return 'item not found';
        }
        else{
            cartitems.splice(cartindex,1);
        }
    }
}
var cartitems=[
    new cartmodel(1,2,1,1),
   new cartmodel(2,1,2,2),
]