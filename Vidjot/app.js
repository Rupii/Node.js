const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    var title = "Rupesh";
    res.render("index",{
        title: title
    });
});

app.get('/about', (req, res) =>{
    res.render('about')
});