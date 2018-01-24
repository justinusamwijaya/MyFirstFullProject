const express = require("express");
const cart = require("../models/cart.js")
const Products = require("../models/products.js");
const jwt = require("jsonwebtoken");
const uuidv4 = require('uuid/v4');

const router = express.Router();

router
.post("/addnew", (req, res) => {
    if (!req.files.Gambar) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.Gambar;
    let imageName = uuidv4() + ".png"

    image.mv("./public/gambar/" + imageName, (error) => {
        
        if (error) return res.status(500).send(error);
        
        let newObj = new Products({
            UploaderId:req.body.UploaderId,
            UploaderName:req.body.Uploadername,
            NamaProduk:req.body.NamaProduk,
            Deskripsi:req.body.Deskripsi,
            Harga:req.body.Harga,
            Gambar:"http://localhost:3000/gambar/"+imageName,
        });
        
        newObj.save((error) => {
            if (error) {
                res.status(500).send(error);
            }
            else{
                res.json(newObj);
            }
        });

    });

})
.get("/list",(req,res)=>{
    Products.find({},(error,result)=>{
        if(error) res.json(error);
        else {
        
            res.json(result)
        }
        
    })
})
.delete("/delete/:id", (req, res) => {

    Products.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json({ message : "Data deleted" })
        }
    });
    

})
.get("/list/:id",(req,res)=>{
    Products.findById({_id:req.params.id},(error,result)=>{
        if(error)res.send(error);
        else res.json(result);
    })
})
.put("/update/:id",(req,res)=>{
    let newObj ={
        NamaProduk:req.body.NamaProduk,
        Deskripsi:req.body.Deskripsi,
        Harga:req.body.Harga,
    }
    Products.findByIdAndUpdate({_id:req.params.id},newObj,(error,result)=>{
        if(error) res.json(error);
        else res.json(result);
    })
})
.get("/profile/:id",(req,res)=>{
    Products.find({UploaderId:req.params.id},(error,result)=>{
        if(error) res.json(error);
        else res.json(result);
    })
})
.get("/:id",(req,res)=>{
    Products.find({},(error,result)=>{
        if(error) res.json(error);
        else {
        
            mo =  req.params.id.toLowerCase().replace(/[^A-Za-z]/, ' ').split(" ")
        let array=[]            
            for(i=0;i<result.length;i++){
                for(j=0;j<mo.length;j++){
                if(result[i].NamaProduk.toLowerCase().replace(/[^A-Za-z]/,' ').split(" ").indexOf(mo[j])>=0){
                    array.push(result[i])
                     }   
                }
            }
            res.json(array)
        }
        
    })
})
.post("/cart", (req, res) => {


});

module.exports = (function(){
    return router;
})();
