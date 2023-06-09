const express = require('express')
const {default : mongoose, mongo} = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/route')
const app = express()
const port = 3000

//  for accessing enviornment variables
dotenv.config()


app.use(express.json())

/* This code is establishing a connection with a MongoDB database using Mongoose. */
mongoose.connect(process.env.password, {
    useNewUrlparser : true
})
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
console.log(err.message)
})




app.use('/', routes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))