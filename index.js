const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Recipe= require("./model");
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/hotelManagementSystem")
.then(()=>{console.log("connected")})
.catch((err)=>{console.log(err)});

app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.get("/",(req,res)=>{
    res.render("home");
})

app.post("/",(req,res)=>{

    const {title,description,file} = req.body;
    const obj = {recipe_title:title, recipe_des:description,recipe_img:file}
   console.log(req.body)
   const rcp = Recipe.create(req.body);
    if(!rcp){res.redirect("/")}
    else{res.render("submit",{obj})}
  
})



app.listen("1000",()=>{
    console.log("listening...")
})