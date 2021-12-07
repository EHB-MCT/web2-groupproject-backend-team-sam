const {
    MongoClient,
    ObjectId
} = require("mongodb");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;
const cors = require('cors');

require('dotenv').config()
const client = new MongoClient(process.env.FINAL_URL);

const dbName = "Session7";

app.use(express.static('public'))
app.use(bodyParser.json());

//klop klop iedereen mag binnen
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


//DONE: Main page
app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
})

// DONE: Get all challenges
app.get('/challenges', async (req, res) => {
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
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        await client.close();
    }
})

// DONE: Get one challenge
app.get('/challenges/:id', async (req, res) => {
    try {
        //connect to the database
        await client.connect();
        const collection = client.db('Session7').collection('Challenges');

        const query = {
            _id: ObjectId(req.params.id)
        };

        const challenge = await collection.findOne(query);

        if (challenge) {
            res.status(200).send(challenge);
            return;
        } else {
            res.status(400).send('Challenge could not found with id: ' + req.params.id);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        })
    } finally {
        await client.close();
    }
})

// DONE: add a challenge
app.post('/challenges/send', async (req, res) => {
    if (!req.body.name || !req.body.points || !req.body.course || !req.body.session) {
        res.status(400).send("Bad request, missing: id, name, points, course or session!");
        return;
    }

    try {
        await client.connect();
        const challengeCollect = client.db("Session7").collection("Challenges");

        const db = await challengeCollect.findOne({
            _id: req.body._id
        });
        if (db) {
            res.status(400).send("Bad request: challenge already exists with id " + req.body.id);
            return;
        }

        let newChallenge = {
            _id: req.body.id,
            name: req.body.name,
            points: req.body.points,
            course: req.body.course,
            session: req.body.session
        }

        let insertChallenge = await challengeCollect.insertOne(newChallenge);

        res.status(201).send(`Challenge succesfully saved with name ${req.body.name}`);
        return;


    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        await client.close();
    }
});

//DONE: update a challenge
app.put('/challenges/:id', async (req, res) => {
    if (!req.body._id || !req.body.name || !req.body.points || !req.body.course || !req.body.session) {
        res.status(400).send("Bad request, missing: id, name, points, course or session!");
        return;
    }

    try {

        await client.connect();

        const collection = client.db('Session7').collection('Challenges');
        const query = {
            _id: ObjectId(req.params.id)
        };

        let update = {
            $set: {
                name: req.body.name,
                course: req.body.course,
                points: req.body.points,
                session: req.body.session,
            }
        };

        const updateChallenge = await collection.updateOne(query, update)
        if (updateChallenge) {
            res.status(201).json(updateChallenge);
            return;
        } else {
            res.status(400).send({
                error: `Challenge with id "${req.body._id}" could not been found!.`,
                value: error,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        await client.close();
    }
});

//DONE: delete a challenge
app.delete('/challenges/:id', async (req, res) => {
    try {
        await client.connect();

        const collection = client.db('Session7').collection('Challenges');

        const query = {
            _id: ObjectId(req.params.id)
        };

        await collection.deleteOne(query)
        res.status(200).json({
            succes: 'Succesfully deleted!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        })
    }
})

app.listen(port, () => {
    console.log(`API running at at http://localhost:${port}`)
})