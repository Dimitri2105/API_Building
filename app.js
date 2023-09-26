const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require('./route/routes')
const userRoutes = require('./route/userRoutes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(routes)
app.use(userRoutes)

mongoose
.connect('mongodb+srv://karannewuser:fEmZhME5inEdMBMv@cluster0.knsqu0p.mongodb.net/API_BUILDING?retryWrites=true&w=majority')
.then( (result) => {
    app.listen(4000, () =>{
        console.log('Server listening on port 4000')
    })
})