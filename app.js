const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongodbConnect = require('connect-mongodb-session')(session)

const MONGODB_URI = "mongodb+srv://wm401238:VLMfH3tCfy5rAjOn@cluster0.7lptiej.mongodb.net/test"

const store = new MongodbConnect({
  uri: MONGODB_URI,
  // Collection name should be upon us
  collection:'sessions'

})

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Secret

app.use(session({secret:'A Secret',resave:false, saveUninitialized:false,store:store}))

// app.use((req, res, next) => {
//   User.findById('64e1ec8dd24ce1c2cbdbd83e')
//     .then(user => {
//       req.user = user;
//       next();
//     })

//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Wali',
          email: 'wm401238@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
