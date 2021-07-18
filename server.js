//Call dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");

//Tells node that we are creating an "express" server;// Sets an initial port. 
const app = express();
const port = process.env.PORT || 3005;

//express. urlencoded() is a method inbuilt ;middleware;The class videos of  Express Day2 have this info;;handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes & api routes are below; can be kept in a separate files like Restaurant mini proj app
//db.json keeps track of note tracker saves ,deletes;//Mostly all these are ref to Starwars and Restaurant app..
// I think id can be best done from npm package UUID ;Many concepts for this HW  like req.bodywere repeated 7/17 MYSQL day 2 class  as well.Refer videos for later

app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, '/public/index.html'));     
            });

app.get("/notes", function(req, res){
res.sendFile(path.join(__dirname, '/public/notes.html'));  
            });

app.get("/api/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/db/db.json"));  
              });

app.get("/api/notes/:id", function(req, res) {
let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
res.json(Savednotetext[Number(req.params.id)]);
             });

app.get("*", function(req, res) {    
res.sendFile(path.join(__dirname, '/public/index.html'));
            });

app.post("/api/notes", function(req, res) {
    let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteSavingID = Savednotetext.length.toString();
    newNote.id = noteSavingID;
    Savednotetext.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(Savednotetext));
    console.log("Saving note: ", newNote);
    res.json(Savednotetext);
});

//Deletes ;reassigns ID and rewrites in db.json
app.delete("/api/notes/:id", function(req, res) {
let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let currentid = req.params.id;
let upcoming_idno = 0;
Savednotetext = Savednotetext.filter((pnote) => {
return pnote.id != currentid;
    });

for (pnote of Savednotetext) {
pnote.id = upcoming_idno.toString();
upcoming_idno++;
    }

fs.writeFileSync("./db/db.json", JSON.stringify(Savednotetext));
res.json(Savednotetext);
});

app.listen(port, function() {
    console.log(`Waiting on port ${port}`);
});
