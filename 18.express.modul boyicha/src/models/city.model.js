import { Schema,model } from "mongoose";


const schemaCity=new Schema({
    name:{type:String,required:true,unique:true},
    area:{type:Number},
    country_id:{type:Schema.Types.ObjectId,ref:"country"}
},{timestamps:true})

export const cityModel=model('city',schemaCity);