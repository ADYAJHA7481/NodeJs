const express = require("express");
const app = express();

const port = 8080;

app.set("view engine","ejs");

// app.get("/",(req,res) => {
//     res.render("home.ejs");
// })
app.listen(port,() => {
    console.log(`listenting on port ${port}`);
});

// app.get("/rolldice",(req,res) => {
//     let {diceVal}=Math.floor(Math.random()*6)+1;
//     res.render("rolldice.ejs",{diceVal});
// });

app.get("/ig/:username",(req,res)=>{
    let {username} =req.params;
    res.render("insta.ejs",{username});
});