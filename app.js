require("dotenv").config();

const express=require('express');
const path=require("path");
const mongoose=require('mongoose')

const app=express();
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const cookieParser=require('cookie-parser')
const {checkForAuthenticationCookie}=require('./middlewares/authentication')
const blog=require("./models/blog");
const { assert } = require('console');



const PORT=process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
mongoose.connect(process.env.MONGO_URL).then(e=>console.log("Mongo db connected"))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve('./public')));

app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));

app.get('/',async (req,res) =>{
    const allBolgs=await blog.find({});
    res.render("home",{ 
        user:req.user,
        blogs:allBolgs,
    });
})
app.use("/user",userRoute);
app.use("/blog",blogRoute);





app.listen(PORT,()=>{
    console.log("server started")
})