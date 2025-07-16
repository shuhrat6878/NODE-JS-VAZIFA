import {Schema,model} from "mongoose";

const orderSchema = new Schema({
  user_id: String,
  book_id: { type: Schema.Types.ObjectId, ref: "Book" },
  quantity: Number,
  total_price: Number,
  date: Date
});
const order = model("Order", orderSchema);
export default  order;
