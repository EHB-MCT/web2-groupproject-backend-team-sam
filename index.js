const {
    MongoClient
} = require("mongodb")
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;

require('dotenv').config()
const client = new MongoClient(process.env.FINAL_URL);


const dbName = "Session7";

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('I am gRoot')
    res.send('Hello WEB, my old friend. Ive come to talk with you again')
})



app.get('/ALLchallenge', async (req, res) => {
    try {
        //connect to the database
        await client.connect();
        console.log("Bingo");

        const db = client.db(dbName);
        // Use the collection "Session7"
        const col = db.collection("Challenges");
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

app.get('/ONEchallenge', async (req, res) => {

    let challengeID = req.query.id;

    try {
        //connect to the database
        await client.connect();
        console.log("Bingo");

        const collection = client.db('session7').collection('Levels');

        const query = {
            bggid: Number(challengeID)
        };
        const options = {
            // Include only the `title` and `imdb` fields in the returned document
            projection: {
                _challengeID: 0
            },
        };

        const bg = await collection.findOne(query, options)

        if (bg) {
            res.status(200).send(bg);
            return;
        } else {
            res.status(400).send('Challenge could not found with id: ' + challengeID);
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).send({
            error: 'error',
            value: error
        })
    } finally {
        await client.close();
    }
})

app.post('/challenge/save', async (req, res) => {
    console.log(req.body);
    data = JSON.stringify(req.body);
    try {
        let result = await fs.writeFile(`test.json`, data);

    } catch (error) {
        console.log(error);
    }
    res.send(`Data recieved with id ${req.body.id}`);
});


app.post('/challenges', async (req, res) => {
    try {
        //connect to the database
        await client.connect();
        console.log("Bingo");

        const db = client.db(dbName);
        // Use the collection "Session7"
        const col = db.collection("challenges");

        // Construct a document                                                                                                                                                              
        let challengeDoc = {
            name: req.body.name,
            points: req.body.points,
            course: req.body.course,
            session: req.body.session
        }

        res.status(200).send('succesfully uploaded')

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(challengeDoc);

        // Find one document
        const myDoc = await col.findOne();

        // Print to the console
        console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
})



app.listen(port, () => {
    console.log(`API running at at http://localhost:${port}`)
})