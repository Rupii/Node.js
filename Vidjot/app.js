const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Idea');
const port = 5050;

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/vidjot', {
    useMongoClient: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Load ideas
const Idea = mongoose.model('ideas');


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body- parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    var title = "Rupesh";
    res.render("index",{
        title: title
    });
});

app.get('/about', (req, res) =>{
    res.render('about');
});


app.get('/ideas/add', (req, res) =>{
    res.render('ideas/add');
});

app.post('/ideas', (req, res) => {
   let errors = [];

   if(!req.body.title){
       errors.push({text: 'please add text'});
   }
   if(!req.body.details){
    errors.push({text: 'please add text'});
   }
   if(errors.length > 0){
       res.render('ideas/add',{
           errors: errors,
           title: req.body.title,
           details: req.body.details
       });
   }else{
      const newUser = {
          title: req.body.title,
          details: req.body.details
      }
      new Idea(newUser)
        .save()
        .then(idea => {
            res.redirect('/ideas');
        });
   }

});


app.get('/ideas', (req, res) => {
    Idea.find({})
     .sort({date:"desc"})
     .then(ideas => {
         res.render('ideas/index', {
             ideas: ideas
         })
     })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
});