const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));


const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "college",
    password: "adya@123.",
});

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

// connection.query(q,[data], (err, result) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         return;
//     }
//     console.log('Tables:', result);
// });


  //Home Route
app.get("/",(req,res) => {
    let q = `SELECT count(*) FROM user`;
    connection.query(q, (err, result) => {
        if (err) {
         console.error('Error executing query:', err);
            res.send(err);
        }
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count});
    }); 
    
});

//Show Route
app.get("/user",(req,res) => {
    let q = `SELECT * FROM user`;
    connection.query(q, (err,users) => {
        if (err) {
         console.error('Error executing query:', err);
            res.send(err);
        }
        res.render("showusers.ejs",{users});
    }); 
    
});

//Edit Route
app.get("/user/:id/edit",(req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = ? `;
    connection.query(q,[id] ,(err,users) => {
        if (err) {
         console.error('Error executing query:', err);
            return res.send(err);
        }
        let user = users[0];
        if (users.length > 0) {
            res.render("edit.ejs", { user });
        } else {
            res.send('User not found');
        }
        
        console.log(users);
    });
});

//Update (DB) Route
app.patch("/user/:id",(req,res) =>{
    let {id} = req.params;
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}' `;
    try {
        connection.query(q ,(err,result) => {
            if (err) throw err;
            let user = result[0];
            if(formPass != user.password){
               res.send("WRONG password");
            }else{
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}' `;
                connection.query(q2,(err,result) =>{
                    if(err) throw err;
                    return res.send("Username updated successfully");
                })
            }
        });
    } catch (error) {
        console.log(err);
        return res.send("Some err in DB");
    }
});



let port = 8080;

app.listen("8080",() =>{
    console.log(`server is listening to port ${port}`);
});
