import { Schema, model } from "mongoose";

const izohSchema = new Schema({
    name:{type: String,  required: true},
    praduct_id: { type: Schema.Types.ObjectId, ref:"Praduct"}
},{timestamps: true});


const  Izoh = model('Izoh', izohSchema);
export default Izoh;