import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/ProductRouter.js";
import userRouter from "./routes/userRouters.js";
import jwt from "jsonwebtoken";

let app = express();


const mongoUrl = 'mongodb+srv://Admin:helloUser@cluster0.sjda7vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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

    jwt.verify(token,"cbckeyforencryption2025",(error,

decoded)=>{
  if(!error){
    console.log(decoded)
    req.user = decoded
  }
}

)
  }
  next()
  }
   
)

app.use(express.json());

app.use("/api/products",productRouter)
app.use("/api/user",userRouter)


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});  