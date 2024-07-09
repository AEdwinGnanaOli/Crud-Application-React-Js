const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require("./models/Users")
const cookieParser=require('cookie-parser')
// const server = require('http').createServer();
require("dotenv").config();
const { MONGO_URL,PORT} = process.env;
// const port = process.env. || 3001
const app = express()
app.use(cookieParser())
app.use(cors({
  origin: ['https://superlative-cactus-a78d6d.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(express.json())

// exports.handler = async (event) => {
//   const response = {
//       statusCode: 200,
//       headers: {
//           'Access-Control-Allow-Origin': 'https://golden-nasturtium-2ddbc3.netlify.app',
//           'Access-Control-Allow-Headers': 'Content-Type',
//           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
//       },
//       body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };
  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  };
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }).catch((err)=>{
    console.log(err)
  });

app.get("/",(req,res)=>{
    userModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get("/getUser/:id",(req,res)=>{
    const id = req.params.id;
    userModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/update/:id', (req,res) => {
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id: id}, {
        name:req.body.name, 
        email: req.body.email, 
        age: req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/create",(req, res)=>{
userModel.create(req.body).
then(users => res.json(users)).
catch(err => res.json(err))
})

