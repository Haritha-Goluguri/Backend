import cors from 'cors';
import express from 'express';
import { connectToDB,db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

app.post('/insertone', async(req, res) => {
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insertmany', async(req, res) => {
    await db.collection("ast").insertMany(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/deleteone', async(req, res) => {
    await db.collection("ast").deleteOne({Name:"haritha",Team:"ast"})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/deletemany', async(req, res) => {
    await db.collection("ast").deleteMany()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/updateone', async(req, res) => {
    await db.collection("ast").updateOne(req.body.filter,{$set:req.body.update})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/updatemany', async(req, res) => {
    await db.collection("ast").updateMany({Name:"haritha"},{$set:{Name:"divya"}})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/findone', async(req, res) => {
    await db.collection("ast").findOne(req.body.query)
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/findmany', async(req, res) => {
    await db.collection("ast").findMany(req.body.query).toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/signin', async(req, res) => {
    await db.collection("ast").findOne({Email:req.body.email,Password:req.body.password})
    .then((result)=>{
        if(result?.Password===req.body.password){
        res.json({message:"login sucess",values:result})
        }else{
            res.json({error:"user not found"})

        }
    })
    .catch((e)=>console.log(e))
}) 
app.post('/signup', async(req, res) => {
    await db.collection("ast").insertOne({Email:req.body.email,Password:req.body.password})
    .then((result)=>{
        res.json({message:"Password set success",values:result})
        
    })   
    .catch((e)=>console.log(e))
}) 

app.post('/forgotpassword', async(req, res) => {
    await db.collection("ast").updateOne({Email:req.body.email},{$set:{Password:req.body.password}})
    .then((result)=>{
        if(result?.Email===req.body.email){
        if(result?.Password===req.body.password){
            res.json({message:"password used change it",values:result})
            }else{
                res.json({message:"successfully changed"})
    
            }
        }
    })
    .catch((e)=>console.log(e))
}) 
connectToDB(() => {
    app.listen(8000, () => {
        console.log("server running at 8000");
    })
})