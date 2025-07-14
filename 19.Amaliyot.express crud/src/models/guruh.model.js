import { Schema, model } from "mongoose";

const GuruhSchema = new Schema({
    name:{type: String, unique:true, required: true},
    soni: {type: Number},
    universitet_id: {type:Schema.Types.ObjectId, ref: 'Universitet'}
},{ timestamps: true});

const Guruh = model('Guruh', GuruhSchema);
export default Guruh;