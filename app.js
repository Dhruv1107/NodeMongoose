const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e1c42b25e68fe92144a4aca')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://dhruv:inCR7diBALE@cluster0-shard-00-00-uclka.mongodb.net:27017,cluster0-shard-00-01-uclka.mongodb.net:27017,cluster0-shard-00-02-uclka.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Dhruv',
        email: 'max@test.com',
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
