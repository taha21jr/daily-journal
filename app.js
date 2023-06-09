//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
const _ = require("lodash");
mongoose.connect('mongodb://127.0.0.1:27017/blogDB',{useNewUrlParser: true })
const app = express();
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String

};

const Post = new mongoose.model('Post',postSchema);

app.get("/",(req,res)=>{
  

    Post.find({}).then((posts)=>{
       console.log(posts);
        console.log("All Post found")
        res.render("home",{
          homeContent: homeStartingContent,
          postStory:posts
        });
    }).catch((error)=>{
      console.log(error)
    });

  
});

app.get("/about",(req,res)=>{
  res.render("about",{
    aboutCont: aboutContent 
  });
});

app.get("/contact",(req,res)=>{
  res.render("contact",{
    contactCont: contactContent 
  });
});

app.get("/compose",(req,res)=>{

  res.render("compose");
});

app.post("/compose",(req,res)=>{

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postStory
  })

  //saving the story in db
  post.save();
  res.redirect("/")
})

app.get('/posts/:postId', (req, res) => {

  // const requestedPost = _.lowerCase(req.params.topic);
  const contentId = req.params.postId;
  console.log(contentId);

  Post.findOne({_id: contentId}).then((post)=>{
    res.render('post',{
      postTitle: post.title,
      postContent: post.content
    })
  }).catch((err)=>{
      console.log(err);
  });

  // posts.forEach(post => {
  //   const storedTitle = _.lowerCase(post.title);
    
  //   if (storedTitle === requestedPost ){
  //       res.render('post',{
  //         postTitle: post.title,
  //         postContent: post.story
  //       })
  //   }
  // });

})

app.listen(3000, ()=> {
  console.log("Server started on port 3000");
});
