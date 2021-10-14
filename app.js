//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');



const homeStartingContent = "Hello, my name is Michael Satumba and I made this website. You can create a post and delete them all if you want.";
const aboutContent = "A little about me: I love spam.";
const contactContent = "If the phone isn't ringing I know it's you.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent1: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent1: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    postTitle: req.body.postTitle,
    postBody:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  let flag = 0; // to check if a post if found or not
  for(let i = 0; i < posts.length; i++){
    const store = _.lowerCase(posts[i].postTitle);
    if (store === requestedTitle) {
      flag = 1;
       res.render("post", {
        title: posts[i].postTitle,
        content: posts[i].postBody
      });
      break;
    }
  }
  if(flag===0) console.log('Post not found');

  //THE FUNCTION BELOW WAS THROWING AN ERROR BECAUSE THE forEach() FUNCTION DIDN'T END EVEN AFTER RENDERING THE VIEW.
  // posts.forEach(function(post) {
  //   const store = _.lowerCase(post.postTitle);
  //   if (store === requestedTitle) {
  //     res.render("post", {
  //       title: post.postTitle,
  //       content: post.postBody
  //       });
  //   } else {
  //     console.log("error");
  //   }
  // });
});

  app.post("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    const del = posts.filter(post => _.lowerCase(post.postTitle) !== requestedTitle)
    posts = del;
    console.log(del);
    res.redirect("/");
  });













let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port, function() {
  console.log("Server started successfully on port 8000");
});
