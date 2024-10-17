import jwt from "jsonwebtoken";
const jwtauth=(req,res,next)=>{
    // 1.read the token
   const token=req.headers['authorization'];
   // 2. check if not token send error;
   if(!token){
     res.status(401).send("unauthorized");
   }
   //3. check token is valid or not;
   try{
       const payload=jwt.verify(token,"pOgYMaNE8o");
       req.userid=payload.userid;
       console.log(payload);
   }// 4.check the error;
   catch(err){
     // console.log(err);
    return res.status(401).send('unauthourized');
   }
   //5. call the next middleware;
   next();
}
export default jwtauth;