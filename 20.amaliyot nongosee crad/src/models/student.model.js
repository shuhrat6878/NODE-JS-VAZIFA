import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    full_name: { type: String, required: true },
    ege:{type:Number},
    guruh_id:{type:Schema.Types.ObjectId,ref:'guruh'}
})


export const modelStudent = model('student', studentSchema);