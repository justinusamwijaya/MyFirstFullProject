const ex = require("express");
const bopas = require("body-parser");
const file = require ("express-fileupload");
const pass = require("passport");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/user.js");
const productsRoute = require("./routes/products.js");

const bear = require("passport-http-bearer").Strategy;
const up = ex();

pass.use("lolol", new bear((token, done) => {
    jwt.verify(token, "secretkey", (error, decoded) => {

        if (error) {
            return done("User Not Authorized", null);
        }
        else{
            return done(null, decoded);
        }

    })

}))

up
.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
})
.post("/api/validate",pass.authenticate("lolol",{session:false}),(req,res)=>{
    res.send(req.user);
})
.use(pass.initialize())
.use(bopas.json())
.use(bopas.urlencoded({extended:true}))
.use(file())
.use(ex.static('public'))
.use("/users",userRoute)
.use("/products",productsRoute)
.listen(3000)