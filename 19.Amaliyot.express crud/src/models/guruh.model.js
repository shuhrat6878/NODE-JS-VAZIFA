import { Schema, model } from "mongoose";

const GuruhSchema = new Schema({
    name:{type: String, unique:true, required: true},
    soni: {type: Number},
    universitet_id: {type:Schema.Types.ObjectId, ref: 'Universitet'}
},{ timestamps: true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

GuruhSchema.virtual("student", {
    ref: "student",
    localField: "_id",
    foreignField: "guruh_id"
});

const Guruh = model('Guruh', GuruhSchema);
export default Guruh;