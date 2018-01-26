const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myproject", { useMongoClient : true });

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    
    ProductId:String,
    UserId:String,
    Gambar:String,
    NamaProduk:String,
    Price:Number,
    Quantity:Number,

});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;