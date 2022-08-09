//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
var colorName = "";
var fontColor = "black";
// Home:homeStartingContent, 
// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts=[];
var isDark = "false";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  // console.log(posts);
  res.render("home",{Posts:posts, Dark: isDark});
})

app.get("/about",function(req,res){
  res.render("about",{About:aboutContent, Dark:isDark});
})


app.get("/contact",function(req,res){
  res.render("contact",{Contact:contactContent, Dark:isDark});
})

// app.get("/compose", function(req,res){
//   res.render("compose",{Dark:isDark});
// })


app.post("/", function(req,res){
  var content = new String(req.body.postBody);
  var Title = req.body.postTitle;
  var color = req.body.pColor;
  
  switch (color) {
    case "1":
      colorName = "red";
      fontColor = "black"
      break;
    case "2":
      colorName = "Black";
      fontColor = "white";
      break;
    case "3":
      colorName = "White";
      if(isDark == "true"){
        fontColor="White";
      } else fontColor = "black";
      break;   
    default:
      console.log("No Color Selected")
      break;
  }
  const post = {
    title: Title,
    body: content,
    color: colorName,
    fontC: fontColor  
  };
  console.log(content.length);
  posts.push(post);
  res.redirect("/");
})


app.post("/dark", function(req,res){
  if(isDark == "false"){
    isDark = "true";
  } else isDark = "false";
  console.log(req.originalUrl);
  res.redirect("/");
})


app.get("/posts/:postName", function(req,res){
  posts.forEach(function(post){
    if(_.lowerCase(req.params.postName)==_.lowerCase(post.title)){
      const Ptitle = post.title;
      const Pbody = post.body;
      res.render("post",{PostT:Ptitle,PostB:Pbody, Dark:isDark})
    } else console.log("invalid title");
  })
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
