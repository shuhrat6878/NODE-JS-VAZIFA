import {Schema,model} from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author", 
      required: true,
    },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    sold: { type: Number},
    stock: { type: Number},
  },
  { timestamps: true }
);
const BookSchema = model("Book", bookSchema);
export default BookSchema
