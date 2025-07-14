import { Schema, model } from "mongoose";

const countrySchema = new Schema({
    name: { type: String, unique: true, required: true },
    language: { type: String },
    valute: { type: String },
    nationality: { type: String },
    population: { type: Number },
},{
    timestamps:true,
    virtuals:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

    
countrySchema.virtual('sities',{
    ref:"city",
    localField:"_id",
    foreignField:"country_id"
})

export const modelCountry = model('country', countrySchema);