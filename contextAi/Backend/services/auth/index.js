import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
dotenv.config()
import router from "./routes/auth.route.js"
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use('/',router)
app.get("/",(req,res)=>{
    res.json({message:"hello from auth"})
})

app.listen(port,()=>{
    console.log(`auth is running at PORT ${port}`)
    connectDb()
})
