import {Schema,model} from "mongoose";

const authorSchema = new Schema({
    name: { type: String, required: true },
    country: String,
    age: Number,
  },
  { timestamps: true }
);
const author = model("Author", authorSchema);
export default author
