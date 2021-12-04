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


//Main page
app.get('/', (req, res) => {
    console.log('I am gRoot')
    res.send('Hello WEB, my old friend. Ive come to talk with you again')
})


//Get all challenges
app.get('/challenge', async (req, res) => {
    try {
        //connect to the database
        await client.connect();

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

//Get one challenge
app.get('/challenge', async (req, res) => {

    let _id = req.query.id;
    console.log(_id)

    try {
        //connect to the database
        await client.connect();


        const collection = client.db('session7').collection('Levels');

        const query = {
            _id: Number(_id)
        };
        const options = {
            // Include only the `title` and `imdb` fields in the returned document
            projection: {
                _id: 0
            },
        };

        const challenge = await collection.findOne(query, options)

        if (challenge) {
            res.status(200).send(challenge);
            return;
        } else {
            res.status(400).send('Challenge could not found with id: ' + _id);
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

//Save one challenge
app.post('/challenge/save', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db('session5').collection('boardgames2');

        let insertData = await collection.insertOne(newBoardgame);
        console.log(`Data added with _id: ${insertData.insertedId}`);

        res.status(201).send(`Challenge succesfully saved with id ${req.body.challengeID}`);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'error',
            value: error
        });
    } finally {
        await client.close();
    }
});

//Post challenge
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