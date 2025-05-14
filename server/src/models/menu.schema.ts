import mongoose, { Schema } from "mongoose";

type MenuType = {
  name: String;
  category_id: mongoose.Types.ObjectId;
  price: number;
  image: String;
};
const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "MenuCategory",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

export const MenuModel = mongoose.model<MenuType>("MenuModel", menuSchema);