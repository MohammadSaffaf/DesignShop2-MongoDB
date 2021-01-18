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

app.get('/add' , (req, res) =>{
ShopItem.aggregate([{ $sample: { size: 6 } }])
    .limit(6)
    .then((result) => {
      res.render("add", { newItems: result });
      console.log(result);
    });
})
app.post('/add', (req, res) =>{
    console.log(req.body);
    // const newItems=  new ShopItem({
    //     product_name: req.body.product_name,
    //     company : req.body.company,
    //     price : req.body.price,
    //     picture_Link : req.body.picture_Link,
    //     link_shop : req.body.link_shop,
    //     description : req.body.description,
    // })

    // hier erstellen wir einen neuen Contact mit Hilfe unseres Models! So haben wir alle Methoden, die unser Model auch hat! (save ...)
    // req.body funktioniert NUR wenn die HTML name Attribute und die keys in unserem model übereinstimmen!
    // Sonst muss man das obere verwenden und die keys unseres models mit den name Attributen im req.body verbinden
    const newItems=  new ShopItem(req.body)
    newItems.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
    
})
app.get('/', (req, res) => {
    ShopItem.find()
    .then(result => res.render('index',{newItems: result}))
    .catch(err => console.log(err))
})
app.get('/details/:id', (req, res) => {
    // console.log(req.params.id);
    ShopItem.findById(req.params.id)
    // ShopItem.find()
    .then(result => res.render('details',{Details: result}))
    .catch(err => console.log(err))
})