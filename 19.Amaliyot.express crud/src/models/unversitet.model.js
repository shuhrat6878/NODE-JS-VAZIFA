import { Schema, model } from "mongoose";

const UneversitetSchema = new Schema({
    name: {type: String, unique: true, require: true},
    fakultet: {type:String}
},{
   timestamps:true,
   virtuals: true,
   toJSON: true,
   toObject: true
});

const Universitet =model('Universitet', UneversitetSchema);
export default Universitet;

