const {
    MongoClient, ClientSession
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



app.get('/challenges', async (req, res) => {
    try {
        //connect to the database
        await client.connect();
        console.log("Bingo");

        const db = client.db(dbName);
        // Use the collection "Session7"
        const col = db.collection("challenges");
        // Find document
        const myDoc = await col.find({}).toArray();

        // Print to the console
        console.log(myDoc);
        //Send back the data with the response
        res.status(200).send(myDoc);
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})