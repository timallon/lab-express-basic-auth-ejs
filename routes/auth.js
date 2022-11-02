const router = require("express").Router();

const bcrypt = require('bcryptjs')

router.get("/signup", (req, res, next) => {
    res.render("signup");
  });
  
router.get("/login", (req, res, next) => {
res.render("login");
});
  

/* POST Signup data */
router.post('/auth/signup', async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)
  
      await User.create({
        username: req.body.username,
        password: hashedPassword,
      })
      res.redirect('/auth/login');
    } catch (error) {
      console.log(error.message);
      res.render('auth/signup', { errorMessage: error.message, isConnected: false })
    }
  });

  module.exports = router;