import { Schema, model } from "mongoose";

const praductSchema = new Schema({
    name:{type: String, unique:true, required: true},
    categoy_id: {type:Schema.Types.ObjectId, ref: 'Category'},
},{ timestamps: true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

praductSchema.virtual("Izoh", {
    ref: "Izoh",
    localField: "_id",
    foreignField: "praduct_id"
});

const Praduct = model('Praduct', praductSchema);
export default Praduct;