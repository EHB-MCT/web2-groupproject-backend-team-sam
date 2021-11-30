const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:admin@cluster0.yc2s0.mongodb.net/session7?retryWrites=true&w=majority"
const client = new MongoClient(url);

 // The database to use
 const dbName = "session7";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("Levels");

         // Construct a document                                                                                                                                                              
         let detailsDocument = {
             "name": "Make an HTML-element",
             "points": 5,                                                                                                                                
             "course": "Kickstart",                                                                                                                                 
             "session": 1,
         }

         // Insert a single document, wait for promise so we can read it back
         const d = await col.insertOne(detailsDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);