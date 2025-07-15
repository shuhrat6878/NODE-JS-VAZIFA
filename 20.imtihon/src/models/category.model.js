import { Schema,model } from "mongoose";

const categorySchema = new Schema({
    name:{type: String, unique: true, require:true}

},{
    timestamps:true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});


   
categorySchema.virtual('Praduct',{
    ref:"Praduct",
    localField:"_id",
    foreignField:"category_id"
});


const Category =model('Category',categorySchema);
export default Category;