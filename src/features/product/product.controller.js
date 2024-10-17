import productmodel from "./product.model.js";
export default class productcontroller{
  getallproduct(req,res){
    const product=productmodel.getall();
    res.status(200).send(product);

  }
  addproduct(req,res){
    const {name,price,size}=req.body;
    const newproduct={
      name,
      price:parseFloat(price),
      size:size.split(","),
      imageurl:req.file.filename,
 }
  const createrecord=productmodel.add(newproduct);
    res.status(201).send(createrecord);
  }
  rateproduct(req,res,next){
      try{
     const user_id=req.query.userid;
     const product_id=req.query.productid;
     const ratings=req.query.rating;
       productmodel.rateproducts(user_id,product_id,ratings);
       return res.status(200).send('rating has been added');
      }catch(err){
          console.log('passing error to middleware');
          next(err);
         // return res.status(400).send(err.message);
      }
}
  getoneproduct(req,res){
     const id=req.params.id;
     const product_item=productmodel.get(id);
     if(!product_item){
       res.status(404).send('product is not found');
     }
     else{
      res.status(200).send(product_item);
     }
  }
  filterproduct(req,res){
    const minprice=req.query.minprice;
    const maxprice=req.query.maxprice;
    const category=req.query.category;
    const result=productmodel.filter(minprice,maxprice,category);
    res.status(200).send(result);
  }
}
