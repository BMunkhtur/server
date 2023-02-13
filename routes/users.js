const {Router}=require("express");
const fs =require("fs");
const {v4:uuidv4}= require("uuid");
const bcrypt=require("bcrypt");
const router =Router();


router.post("/signin", (req,res)=>{
    const {id, email,password} =req.body;
    const data =fs.readFileSync("users.json","utf-8");
    const parsedData = JSON.parse(data);
    const findUser = parsedData.users.find((user) =>user.email ===email);
    if (!findUser) {
        res.status(401).json({message:"Ийм хэрэглэгч олдсонгүй"})
    }

  const isCheck = bcrypt.compareSync(password,findUser.password);
  if(isCheck){
    res.status(200).json ({message:"амжилттай нэвтэрлэлээ", user:findUser});

  } else {res.status(401).json({message:"имэйл эсвэл нууц үг буруу байна", user:null})} 
}) 

router.post ("/signup", (req, res) =>{
    const {name, role = "user",email, password} =req.body;
    const data= fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const id = uuidv4();
    const salted = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salted);
    console.log(hashedPassword);
     const newUser ={ id, name , role, email, password:hashedPassword
    };
    parsedData.users.push(newUser);
    fs.writeFileSync("users.json",JSON.stringify(parsedData));
    res.status(201).json({message:"шинэ хэрэглэгч амжилттай бүртгэлээ"})
});

router.get("/",(req,res)=>{
    fs.readFile("users.json", "utf-8",(err,data)=>{
        if(err) {
            console.log("Файл уншихад алдаа гарлаа")
            return;
        }
        console.log(data);
        const parsedData =JSON.parse(data);
        
        res.status(201).json({users: parsedData.users})
    })
})
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const user = parsedData.users.find((el) => el.id === id);
    res.status(200).json({ user });
  });
  router.put("/:id",(req,res)=>{
    const {id} =req.params;
    const {name}=req.body;
    const data = fs.readFileSync("users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.users.findIndex((el)=>el.id===id);
    parsedData.users[findIndex].name =name;
    fs.writeFileSync("users.json",JSON.stringify(parsedData));
    res.status(201).json({message:"шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо"})
});
router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const data = fs.readFileSync("users.json","utf-8");
    const parsedData =JSON.parse(data)
    const findIndex =parsedData.users.findIndex((el)=>el.id ===id);
    parsedData.users.splice(findIndex,1);
     fs.writeFileSync("users.json",JSON.stringify(parsedData));
     res.status(201).json({message:`${id} тай хэрэглэгч амжилттай уншлаа`})
});
module.exports=router