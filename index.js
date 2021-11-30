const {
    MongoClient
} = require("mongodb");
const url = "mongodb+srv://admin:admin@cluster0.yc2s0.mongodb.net/session7?retryWrites=true&w=majority";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(err => {
    const collection = client.db("session7").collection("Levels");
    // perform actions on the collection object
    console.log("Hosting")
    client.close();
});