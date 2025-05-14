import mongoose, { Schema } from "mongoose";

export type MenuCategoryType = {
    name: string;
  };
  
  const menuCategorySchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  export const MenuCategoryModel = mongoose.model<MenuCategoryType>("MenuCategory", menuCategorySchema);