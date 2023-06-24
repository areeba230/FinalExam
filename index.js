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

//middleware
const middleware = (req,res,next)=>{
    console.log("i am n middle")
    if(!req.body.name && !req.body.discription && !req.body.file)
    {res.send("failed to submit");}
    else{next();}
    
}


app.get("/",(req,res)=>{
    res.render("home");
})

app.post("/",middleware,(req,res)=>{

    const {title,description,file} = req.body;
    const obj = {recipe_title:title, recipe_des:description,recipe_img:file}
   console.log(req.body)
   const rcp = Recipe.create(req.body);
    if(!rcp){res.redirect("/")}
    else{
        {res.render("submit",{obj})}
    }
})

app.get("/recipes",(req,res)=>{

    Recipe.find({}, "title") // Find all recipes and retrieve only the "name" field
    .then(recipe => {
      const names = recipe.map(recipe => recipe.title);
      res.render("recipes", {names});
    })
    .catch(error => {
      console.error(error);
      res.redirect("/");
    });
    

})



app.get("/display",(req,res) =>{

    const data =Recipe.find({title:"halwa"});  
    res.render("display",{data})
    
    
   
})

app.listen("1000",()=>{
    console.log("listening...")
})