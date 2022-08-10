//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const ejs = require("ejs");
var _ = require("lodash");
var picture ="";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts=[];
var isDark = "false";
const app = express();

const multer = require("multer");
const path = require("path");


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null,__dirname+"/public/images");
  },
  filename: (req, file, cb) =>{
      console.log(file);
      cb(null, Date.now()+ path.extname(file.originalname));
      console.log(file.filename);
  }
});


const upload = multer({storage:storage});

app.get("/",function(req,res){
  res.render("home",{Posts:posts, Dark: isDark});
})

app.get("/about",function(req,res){
  res.render("about",{About:aboutContent, Dark:isDark});
})


app.get("/contact",function(req,res){
  res.render("contact",{Contact:contactContent, Dark:isDark});
})

app.post("/", upload.single("picture"),function(req,res){
  content = new String(req.body.postBody);
  Title = req.body.postTitle;
  Color = req.body.pColor;
  font = req.body.fColor;
  try{
    picture = req.file.filename;
  } catch(e){
    console.log(e)
  }
  const post = {
    title: Title,
    body: content,
    color: Color,
    fontC: font,
    pic: picture
  }
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
