const express = require("express")
const cors  = require("cors")
const db = require("./config/database.js")
const Auth = require("./routes/auth.js")
require("dotenv").config()
const Post  = require('./routes/post.js')
const app = express()
app.use(cors())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/',Auth)
app.use('/',Post)

const PORT =process.env.PORT || 5000
db()
app.get('/',(req,res)=>{
    res.json({msg:"deneme deneme"})
})
app.listen(PORT,()=>{
    console.log("server is running on port:",PORT);
})