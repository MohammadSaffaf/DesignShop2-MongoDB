require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const ShopItem = require('./models/designshop')
mongoose.connect(process.env.dbUri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>{
app.listen(process.env.PORT,()=> console.log(`http://localhost:${process.env.PORT}`))
})
.catch(err => console.log(err))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//Routes
app.get('/' , (req, res) =>{
    res.render('index')
})
app.get('/add' , (req, res) =>{
res.render('add')
})
app.post('/add', (req, res) =>{
    console.log(req.body);
    res.end()
})