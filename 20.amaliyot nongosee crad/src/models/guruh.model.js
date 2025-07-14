import { Schema, model } from "mongoose";

const guruhSchema = new Schema({
    name: { type: String, unique: true, required: true },
    countStudent:{type:Number},
    univer_id:{type:Schema.Types.ObjectId, ref:"univer"}
},{
    timestamps:true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

guruhSchema.virtual('student',{
    ref:"student",
    localField:"_id",
    foreignField:"guruh_id"
})

export const modelGuruh = model('guruh', guruhSchema);