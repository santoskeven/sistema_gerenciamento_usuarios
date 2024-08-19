const express = require("express")
const exphbs = require('express-handlebars') 
const user = require('./router-user/user')
const port = 3000;
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true,
}))

app.use('/user', user)

app.get('/', (req, res) => {

    res.render('home')

})

app.listen(port, (err) => {

    if(err){console.log(err)}

    console.log('servidor rodando')

})