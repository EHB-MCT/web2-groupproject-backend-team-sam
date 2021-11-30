const express = require('express');
const {
    MongoClient
} = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:admin@cluster0.yc2s0.mongodb.net/session7?retryWrites=true&w=majority"
const client = new MongoClient(url);

// The database to use
const dbName = "Session7";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "Levels"
        const col = db.collection("Challenges");

        // Construct a document                                                                                                                                                              
        let detailsDocument = {
            name: "Make an HTML-element",
            points: 5,
            course: "Kickstart",
            session: 1,
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(detailsDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
} = require('mongodb');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const client = new MongoClient(process.env.FINAL_URL);


client.connect(err => {
    const collection = client.db("session7").collection("Levels");
    // perform actions on the collection object
    console.log("Hosting")
    client.close();
});

app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
});

app.get('/', (req, res) => {
    console.log(req);
    res.send(`Data received with id: ${req.body.id}`);
});

app.get('/public', (req, res) => {
        res.send(`./index.html`);
    }) >>>
    >>> > 4023354 d713a4e4cde5cf9fffde2fb3033f52f57