const express = require('express');
const {
    MongoClient
} = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT;


const client = new MongoClient(process.env.FINAL_URL);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})