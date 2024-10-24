import productmodel from "./product.model.js";
import productrepository from "./product.repository.js";
export default class productcontroller{
  constructor(){
    this.productsreposity=new productrepository();
  }
 async getallproduct(req,res){
    try{
    const product=await this.productsreposity.getall();
    res.status(200).send(product);
    }catch(err){
      console.log(err);
      return res.status(401).send("something went wrong");
    }
 }
  async addproduct(req,res){
    try{
    const {name,price,size}=req.body;
    const newproduct=new productmodel(name,null,parseFloat(price),req.file.filename,null,(size|| '').split(","),
  )
  const createrecord=await this.productsreposity.add(newproduct);
    res.status(201).send(createrecord);
  }catch(err){
    console.log(err);
    return res.status(401).send("something went wrong");
  }
}
  async rateproduct(req,res,next){
      try{
     const user_id=req.userid;
     const product_id=req.body.productid;
     const ratings=req.body.rating;
      await this.productsreposity.rate(user_id,product_id,ratings);
       return res.status(200).send('rating has been added');
      }catch(err){
          console.log('passing error to middleware');
          next(err);
         // return res.status(400).send(err.message);
      }
}
  async getoneproduct(req,res){
    try{
       const user_id=req.params.id;
      const product= await this.productsreposity.get(user_id);
       console.log(product);
      if(!product){
        res.status(404).send('product is not found');
      }
      else{
       res.status(200).send(product);
      }
    }catch(err){
        console.log(err);
        return res.status(401).send("something went wrong");
      }
  }
  async filterproduct(req,res){
    try{
    const minprice=req.query.minprice;
    const maxprice=req.query.maxprice;
    const category=req.query.category;
    const result=await this.productsreposity.filter(minprice,maxprice,category);
    res.status(200).send(result);
  }catch(err){
    console.log(err);
    return res.status(401).send("something went wrong");
  }
  }
}

