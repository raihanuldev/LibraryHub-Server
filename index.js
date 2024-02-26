const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://raihan:S1OgYk9ojeDiNUAK@cluster0.jvqibpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


  async function run() {
    // Todo: After finish the task , implement MVC Pattern for Practice Purpose
    try {
        const booksCollection =client.db('LibraryHub').collection('books');
        const AuhtorsCollection = client.db('LibraryHub').collection('authors');
        const LibrariesCollection = client.db('LibraryHub').collection('Libraries');
        const CategorysCollection = client.db('LibraryHub').collection('categories');

        app.get('/', (req, res) => {
            res.send("Hello there")
        })
        // get all books
        app.get('/books',async(req,res)=>{
            const books = await booksCollection.find().toArray();
            res.send(books);
        })
        // Get Authot
        app.get('/authors',async(req,res)=>{
            const author = await AuhtorsCollection.find().toArray();
            res.send(author)
        })
        // Get all Category
        app.get('/categories',async(req,res)=>{
            const categories = await CategorysCollection.find().toArray();
            res.send(categories)
        })
        // LibrariesCollection
        app.get('/libraries',async(req,res)=>{
            const Libraries = await LibrariesCollection.find().toArray();
            res.send(Libraries);
        })

        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        app.listen(port, () => {
            console.log(`server is running on ${port}`)
        })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


