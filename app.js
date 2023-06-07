const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const app = express();
const hostname = '127.0.0.1'
const port = 80;


//Define Mongoose Schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);



//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //selecting the engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
    // res.status(200).render('contact.pug');
});



//START THE SERVER 
app.listen(port,hostname, ()=>{

        console.log(`Server running at http://${hostname}:${port}/`);
});
