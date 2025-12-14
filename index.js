import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouters.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
dotenv.config();// load env file


let app = express();


const mongoUrl = process.env.Mongo_DB_URL

mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})
app.use(bodyParser.json())



app.use(
  (req,res,next)=>{
      const token =(req.header("Authorization"))?.replace
   ("Bearer","")
   

  if(token !=null){

    jwt.verify(token,process.env.secret,(error,

decoded)=>{
  if(!error){
    console.log(decoded)
    req.user = decoded // attach the decoded payload to request object
  }
}

)
  }
  next()// function to pass the control to next middleware
  }
   
)

app.use(express.json());

app.use("/api/user",userRouter)

app.use("/api/order",orderRouter)
app.use("/api/product",productRouter)


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});   