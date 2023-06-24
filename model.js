const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title:String,
    description:String,
    file: String
});

const Recipe = new mongoose.model("Recipe",schema);

module.exports = Recipe;