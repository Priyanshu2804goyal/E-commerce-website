export default class usermodel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this.id=id;
    }
    static signup(name,email,password,type){
        const newuser=new usermodel(name,email,password,type);
        newuser.id=user.length+1;
        user.push(newuser);
        return newuser;
    }
    static signin(email,password){
        const user_result=user.find((u)=>u.email==email && u.password==password);
        return user_result;
    }
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