const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myproject", { useMongoClient : true });

const Schema = mongoose.Schema;

const productSchema = new Schema({
    UploaderId:String,
    UploaderName:String,
    NamaProduk:String,
    Deskripsi:String,
    Harga:Number,
    Gambar:String,
});

const product = mongoose.model("product", productSchema);

module.exports = product;