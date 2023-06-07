const express = require('express')
const {default : mongoose, mongo} = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/route')
const app = express()
const port = 3000


dotenv.config()


app.use(express.json())


mongoose.connect("", {
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