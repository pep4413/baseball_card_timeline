require('dotenv').config()

const express = require('express')
const { MongoClient } = require('mongodb')

const app = express()

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
    const results = await sets.find({}).toArray()
        .then(console.log('results fetched'))
        .catch((err) => console.log(err))
    res.json(results)
})
