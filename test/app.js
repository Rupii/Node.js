const express = require('express');
const exphbs = require('express-handlebars');

const port = 5050;

const app = express();


app.listen(port, () => {
    console.log(`Server running on ${port}`);
    
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const title = "Rupesh";
    res.render('index',{
        title: title
    });
});

app.get('/about', (req, res) =>{
    res.render('about');
});