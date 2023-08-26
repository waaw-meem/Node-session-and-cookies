// exports.getLogin = (req, res, next) => {
//   const isLoggedIn = req.get('Cookie').split('=')[1] === 'true'

//   console.log(req.session.isLoggedIn)

//   res.render('auth/login', {
//     path: '/login',
//     pageTitle: 'Login',
//     isAuthenticated: false
//   });
// };

// exports.postLogin = (req, res, next) => {
//     // Setting a Header response for setting a Cookie Besides this we can configure it as well
//     // HttpOnly, Secure, Expiry
//     // res.setHeader('Set-Cookie','isLoggedIn=true')

//     req.session.isLoggedIn = true
    
//     res.redirect('/');
//   };

//   exports.postLogout = (req, res, next) => {
//     req.session.destroy((err) => {
//       console.log(err)
//       res.redirect('/');
//     }) 
//   };

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};


exports.postLogin = (req, res, next) => {
  User.findById('64e1ec8dd24ce1c2cbdbd83e')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      console.log(err);
      res.redirect('/');
    });
  })
  .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
