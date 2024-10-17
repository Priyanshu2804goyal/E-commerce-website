import usermodel from "../features/user/user.model.js";
const basicauthorizer=(req,res,next)=>{
    // 1.check is authorization  header is empty or not;
    const authHeader=req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("no authorization detail is found");
    }
    console.log(authHeader);
    // 2. extract credentials [basic vdgbcvhnxsxshxbwjnxb];
    const base64credentials=authHeader.replace('Basic','');
    // 3.decode the credentials.
    const decodecredentials=Buffer.from(base64credentials,'base64').toString('utf-8');
    console.log(decodecredentials);
    const cred=decodecredentials.split(':');
    const user=usermodel.getall().find((u)=>u.email==cred[0] && u.password==cred[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send("incorrect credentials");
    }

}
export default basicauthorizer;