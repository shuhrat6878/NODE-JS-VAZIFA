import { db } from "../db/index.js";
import { ObjectId } from "mongodb";

const createUser = async (req,res)=>{
    try {
        const result  = await db.collection('users').insertOne(req.body);
        const user = await db.collection('users').findOnde({_id:new ObjectId(result.insertedId)});
        return res.status(201).json({
            statusCode:201,
            message: "sucsesss",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            ststusCode: 500,
            message: error.message || "internal server error"
        })
    }
};


export {
    createUser
}