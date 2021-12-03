const {
    MongoClient
} = require("mongodb")
const cors = require ("cors");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;

const url = `mongodb+srv://admin:admin@cluster0.yc2s0.mongodb.net/Session7?retryWrites=true&w=majority`;
const client = new MongoClient(url);


const dbName = "Session7";

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('I am gRoot')
    res.send('Hello WEB, my old friend. Ive come to talk with you again')
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