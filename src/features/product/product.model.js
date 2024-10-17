import { application } from "express";
import usermodel from "../user/user.model.js";
import { applicationerror } from "../../../errorhandler/applicationerror.js";
export default class productmodel{
    constructor(id,name,desc,price,imageurl,category,size){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageurl=imageurl;
        this.category=category;
        this.size=size;
    }
    static get(id){
      const product_item=product.find((i)=>i.id==id);
      return product_item;
    }
    static add(products){
      products.id=product.length+1;
      product.push(products);
      return products;
    }
   static getall(){
     return product;
   }
   static filter(minprice,maxprice,category){
    const result=product.filter((product)=>{
      return((!minprice || product.price>=minprice) && (!maxprice|| product.price<=maxprice) && (!category || product.category==category));
    })
     return result;
   }
   static rateproducts(userid,productid,rating){
     // 1.validate user and product;
     // console.log('function is working');
     const valid_user=usermodel.getall().find((u)=>u.id==userid);
     if(!valid_user){
       throw new applicationerror('user not found',404);
     }
     // 2. VALIDate product;
     const products=product.find((p)=>p.id==productid);
     if(!products){
      throw new applicationerror('product not found',400);
     }
       // const index=product.findIndex((p)=>p.id==productid);
     //2. check if their is rating or not;
     if(!products.ratings){
        products.ratings=[];
        products.ratings.push({userid:userid,rating:rating});
       // console.log(product);
       // console.log(product);
       // product.push(rating);
     }else{
      // check if user rating is already available;
       const existingrating=products.ratings.findIndex((r)=>r.userid==userid);
        if(existingrating>=0){
          products.ratings[existingrating]={
            userid:userid,
            rating:rating,
          }
        }
        else{
          // if no existing rating,then add new rating.
          products.ratings.push({
              userid:userid,
              rating:rating
          })
        }
     }

   }
}
const product=[
    new productmodel( 1,
        'Product 1',
        'Description for Product 1',
         19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'category1',
        ['s','M'],
      ),
      new productmodel( 2,
        'Product 2',
        'Description for Product 2',
         29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'category2',
        ['s','M'],
      ),
      new productmodel(
        3,
  'Product 3',
  'Description for Product 3',
  39.99,
  'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'category3',
    ['S','M','L'],
      )

]
