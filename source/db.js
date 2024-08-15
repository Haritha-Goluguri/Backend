import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const client = new MongoClient(uri);

let db = null;

export const connectToDB = async (callback) => {
    try {
        await client.connect();
        db = client.db('frontend'); // Update with your database name
        console.log("Connected to database");
        callback();
    } catch (error) {
        console.error("Failed to connect to database", error);
    }
};

export { db };
