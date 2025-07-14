import { Schema, model } from "mongoose";


const StudentSchema = new Schema({
    full_name: {type: String, required: true},
    universitet_id:{ type:Schema.Types.ObjectId, ref:"Universitet"},
    guruh_id:{ type: Schema.Types.ObjectId, ref:"Guruh"}
},{timestamps: true});


const Student =model('Student', StudentSchema);
export default Student;