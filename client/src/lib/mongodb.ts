import { MongoClient, ServerApiVersion } from "mongodb";


const MONGO_URI : string = process.env.MONGO_URI ?? "";
console.log("Mongo URI", MONGO_URI);
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
}

const client = new MongoClient(MONGO_URI, {
    serverApi : {
        version : ServerApiVersion.v1,
        strict : true,
        deprecationErrors : true
    }
});

const connectToDatabase = async () => {
    try{
        await client.connect();
        await client.db("admin").command({ ping : 1 });
        console.log("Connected to MongoDB");
    }catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}

const getDatabase = () => {
    return client;
}

export { connectToDatabase, getDatabase };