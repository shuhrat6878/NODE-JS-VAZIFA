import { Schema, model } from "mongoose";

const unverSchema = new Schema({
    name: { type: String, unique: true, required: true },
    faculty:{type:Number}
},{
    timestamps:true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

    
unverSchema.virtual('guruh',{
    ref:"guruh",
    localField:"_id",
    foreignField:"univer_id"
})

unverSchema.virtual("student", {
    ref: "student",
    localField: "_id",
    foreignField: "univer_id"
});

export const modelUnver = model('univer', unverSchema);