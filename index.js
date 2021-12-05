const {
    MongoClient,
    ObjectId
} = require("mongodb");
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

// DONE(just cleaning up):save a challenge
app.post('/challenges/send', async (req, res) => {
    if (!req.body._id || !req.body.name || !req.body.points || !req.body.course || !req.body.session) {
        res.status(400).send("Bad request, missing: id, name, points, course or session!");
        return;
    }

    try {
        await client.connect();

        const challengeCollect = client.db("Session7").collection("Challenges");

        const dbl = await challengeCollect.findOne({
            _id: req.body._id
        });
        if (dbl) {
            res.status(400).send("Bad request: challenge already exists with id " + req.body._id);
            return;
        }

        let newChallenge = {
            _id: req.body._id,
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

//update a challenge
app.put('/challenges/edit/:id', async (req, res) => {

    if (!req.body._id || !req.body.name || !req.body.points || !req.body.course || !req.body.session) {
        res.status(400).send("Bad request, missing: id, name, points, course or session!");
        return;
    }

    try {
        await client.connect();

        const collection = client.db('Session7').collection('Challenges');

        const query = {_id: ObjectId(req.params.id)};

        collection.findOneAndUpdate({query}, req.body).then(function(collection){
            res.send(collection)
        })
        res.status(201).send(`Challenge succesfully saved with id ${req.body._id}`);

        // let insertData = await collection.findOneAndUpdate(collection, {
        //     _id: req.body._id,
        //     name: req.body.name,
        //     points: req.body.points,
        //     course: req.body.course,
        //     session: req.body.session
        // });

        console.log(`Data added with _id: ${req.body._id}`);

 
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

//delete a challenge
app.delete('/deletechallenges/:id', async (req, res) => {
    try{
        await client.connect();

        const collection = client.db('Session7').collection('Challenges');

        const query = {_id: ObjectId(req.params.id)};

        await collection.deleteOne(query)
        res.status(200).json({
            succes: 'Succesfully deleted!',
        });
    }catch(error){
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


console.log("Some shit")