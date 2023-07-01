require('dotenv').config()

const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const client = new MongoClient(process.env.MONG_URI)

const dbConnect = async () => {
    await client.connect()
    console.log('connected to mongo server')
    app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))
}

dbConnect()
    .then(console.log(''))
    .catch((err) => console.log(err))


app.get("/api", async (req, res) => {
    const db = client.db("timeline")
    const sets = db.collection('sets')
    const results = await sets.find({}).sort({ "year": 1 }).toArray()
        .then(console.log('results fetched'))
        .catch((err) => console.log(err))
    res.json(results)
})

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: process.env.eport,
    auth: {
        user: process.env.email,
        pass: process.env.epass
    },
    tls: { rejectUnauthorized: false }
})

contactEmail.verify((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Ready to Send")
    }
})

app.post("/contact", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const mail = {
        from: name,
        to: process.env.email,
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>`               
    }
    contactEmail.sendMail(mail, (err) => {
        if (err) {
            res.json({status: "ERROR"})           
        } else {
            res.json({ status: "Message Sent"})
        }
    })
})

// DB CRUD Routes
// *****

// Create
app.post("/dbadmin", async (req, res) => {
    const db = client.db("timeline")
    const sets = db.collection('sets')
    let result = await sets.insertOne({
        year: req.body.year,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        setCount: req.body.setCount,
        rcOfNote: req.body.rcOfNote,
        imageSrc: req.body.imageSrc,
        content: req.body.content
    })
    res.json({ "status": "successful", "newID": result.insertedId})
})

// Update
app.put("/dba/:id", async (req, res) => {
    const id = req.body.id
    const db = client.db("timeline")
    const sets = db.collection('sets')
    const updater = {...req.body}
    let result = await sets.updateOne({ "_id": new ObjectId(id) }, { $set: {...updater}})
        .catch(err => console.log(err))
    res.json({ "status": "updated"})
})

// Delete
app.delete("/dba/:id", async (req, res) => {
    const id = req.params.id
    const db = client.db("timeline")
    const sets = db.collection('sets')
    const results = await sets.deleteOne( { "_id": new ObjectId(id) } )
        .catch((err) => console.log(err))
    res.json({ "status": "Document Deleted" })
})