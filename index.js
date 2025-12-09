const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));//parse krne ke liye taki express samajh paye.
                                              //jo data aa rha hai api se.
app.use(methodOverride("_method"));                                              

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"shradhakhapra",
        content:"Hard work is importent to achieve success",
    },
    {
        id:uuidv4(),
        username:"sumitkumar",
        content:"I got selected for my 1st internship",
    },
]

app.get("/posts",(req,res)=>{   //get req me query ke ander information aati hai
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{  //post req me body ke ander information aati hai
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});

});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent ;
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{ post });
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("listening to port : 8080");
});