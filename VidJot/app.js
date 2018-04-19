const express = require("express");
const exphbs = require('express-handlebars');

const app = express();


//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const port = 5050;
app.listen(port, () => {
    console.log(`Server set on port ${port}`);
    
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");

});