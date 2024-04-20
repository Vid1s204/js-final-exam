var express = require('express');
var router = express.Router();
const User = require("c:/Users/Admin/OneDrive/Desktop/js final exam/models/user");
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", (req, res, next) => {
  // res.render('login', { title: 'Login' });
  // Obtain session messages if any
  let messages = req.session.messages || [];
  // Clear messages
  req.session.messages = [];
  // Pass messages to view
  res.render("login", { title: "Login", messages: messages });
});

// POST /login
// Syntax will be a bit different since login will be handled by passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })
);

// GET /register
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a new account" });
});

//POST /register
router.post("/register", (req, res, next) => {
  // Create a new user based on the information from the page
  // three parameters: new user object, password, callback function
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        // take user back and reload register page
        return res.redirect("/register");
      } else {
        // log user in and redirect
        req.login(newUser, (err) => {
          res.redirect("/projects");
        });
      }
    }
  );
});

// get /logout
router.get("/logout",(res,req,next)=>{

  req.logout((res)=>{
    res.redirect("/login")

  })
})

//get github
router.get('/github', passport.authenticate('github',{scope:["user.email"]}));

//get github/callback

router.get('/github/callback', passport.authenticate('github',{failureRedirect:	 '/login'}),
(req,res,next) => {
  res.redirect("/projects")
}
);

module.exports = router;