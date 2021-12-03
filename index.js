const {
    MongoClient
} = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser');
const {
    response
} = require('express');
const app = express();
const port = process.env.PORT;
const client = new MongoClient(process.env.FINAL_URL);
const express = require('express')

app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    console.log('Local root called!')
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    console.log("Test called!")
    res.send('Test succeeded')
})

app.get('/data', (req, res) => {
    let exampleData = {
        name: "Sam",
        age: 32
    }
    res.send(exampleData)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})