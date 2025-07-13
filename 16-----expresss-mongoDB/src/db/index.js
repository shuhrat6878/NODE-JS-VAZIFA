import { config } from "dotenv";
import { MongoClient } from "mongodb";
config();


const clent = new MongoClient(process.env.MONGO_URI);
let db;


async function  connectedDb(){
    try {
        await clent.connectedDb();
        db = clent.db()
    } catch (error) {
        console.log('eror on connected oti databses', error.message);
    }
};


export {
    connectedDb,db
};
