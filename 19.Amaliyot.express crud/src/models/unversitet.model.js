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
UneversitetSchema.virtual('guruh',{
    ref:"guruh",
    localField:"_id",
    foreignField:"universitet_id"
})

UneversitetSchema.virtual("student", {
    ref: "student",
    localField: "_id",
    foreignField: "universitet_id"
});

const Universitet =model('Universitet', UneversitetSchema);
export default Universitet;

