const express = require("express")
const app = express()
const bodyParser = require("body-parser")

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
   res.render("submit",obj)
})



app.listen("1000",()=>{
    console.log("listening...")
})