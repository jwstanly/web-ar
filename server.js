//ssl credentials
const fs = require("fs");
const key = fs.readFileSync("./ssl/key.pem");
const cert = fs.readFileSync("./ssl/cert.pem");

//express server
const express = require("express");
const https = require("https");
const app = express();
const server = https.createServer({ key: key, cert: cert }, app);

//misc
const path = require("path");

app.set("/", "html");
app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/threejs.html", (req, res) => {
    res.render("threejs");
});

app.get("/loc.html", (req, res) => {
    res.render("loc");
});

server.listen(8080, () => {
    console.log("Yo homie listening on 8080");
});