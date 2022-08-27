const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = process.env.PORT || 8000;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

var contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//ENDPOINTS
app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
  });

app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
  });

// to post using express install body-parser
app.post('/contact',(req, res)=>{
    var myData = new contact(req.body)
      myData.save().then(() => {
        res.send('your data has been saved in the database')
      }).catch(() => {
        res.status(400).send('information is not saved in the database')
      })
    
  });

  // START THE SERVER
 app.listen(port, ()=>{
    console.log(`The app started successfully on port ${port}`);
   });