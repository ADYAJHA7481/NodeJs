const express = require("express");
const app = express();

const port = 8080;

app.set("view engine", "ejs");

// Uncomment if needed
// app.get("/", (req, res) => {
//     res.render("home.ejs");
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Uncomment if needed
// app.get("/rolldice", (req, res) => {
//     res.render("rolldice.ejs");
// });

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if (data) {
        res.render("insta.ejs", { data });
    } else {
        res.send("User not found");
    }
});
