const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router
.post("/addnew", (req, res) => {
    let newObj = new User({
        username : req.body.Username,
        password : req.body.Password,
    });
    
    newObj.save((error) => {
        if (error) {
            res.status(500).send(error);
        }
        else{
            res.json(newObj);
        }
    });
})
.post("/login", (req, res) => {

    User.findOne({ Username : req.body.Username, Password : req.body.Password}, (error, result) => {
        
        if(error){
            res.status(500).json(error);
        }
        else if(!result){ 
            res.status(404).json({ message : "User not found !"});
        }
        else {

            const payload = {
                id : result._id,
                name : req.body.Username
            };
            const tok= jwt.sign(payload, "secretkey", { expiresIn : 10000 });    
            res.json({ token: tok,
                        profile:payload});
        
        }

    });
});

module.exports = (function(){
    return router;
})();
