import { Schema, model } from "mongoose";4

const CountrySchema = new Schema({
    name: {type: String, unique: true, requird: true},
    language: { type: String},
    valuta: { type: String},
    nationality: { type:String},
    population: { type: Number},
},{ timestamps: true});


const Country = model('Country', CountrySchema);

export default Country;