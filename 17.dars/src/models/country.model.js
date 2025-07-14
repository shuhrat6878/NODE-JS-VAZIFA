import { Schema,model } from "mongoose";


const CountrySchema = new Schema({
    name: { type: String, unique: true, require: true},
    language:{type: String}
},{timestamps: true});

const Country = model('Country',CountrySchema);
export default Country;