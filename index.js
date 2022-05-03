const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// KF45VD5G6kJwc7er

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.chven.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db("ITManagement").collection("item");
        // Get Multiple Data
        app.get('/item', async (req, res) => { 
            const query = {};
            const cursor = itemsCollection.find(query);
            const items = await cursor.limit(6).toArray();
            res.send(items);
        });
        // create a document to insert
        app.post('/item', async (req, res) => {
            const item = req.body;
            const result = await itemsCollection.insertOne(item);
            res.send({ result });
        });


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});