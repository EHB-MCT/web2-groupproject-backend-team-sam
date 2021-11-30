const express = require('express');
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

<<<<<<< Updated upstream

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
})
=======
app.use(bodyParser.json());
app.use(express.static("public"));
>>>>>>> Stashed changes
