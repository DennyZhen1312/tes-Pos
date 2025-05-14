import mongoose from "mongoose";
import { MenuCategoryModel, MenuModel } from "./models";

async function seedDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("🛑 MONGODB_URI is not defined in environment variables");
    }
    // Connect to MongoDB
    await mongoose.connect(uri);

    // Clear existing data
    await MenuModel.deleteMany({});
    await MenuCategoryModel.deleteMany({});

    // Create categories
    const foodCategory = await MenuCategoryModel.create({ name: "Foods" });
    const beverageCategory = await MenuCategoryModel.create({
      name: "Beverages",
    });

    // Seed menu items
    const menus = [
      {
        name: "Burger",
        category_id: foodCategory._id,
        price: 9.99,
        image:
          "https://png.pngtree.com/png-vector/20240602/ourmid/pngtree-biggest-burger-transparent-picture-png-image_12606363.png",
      },
      {
        name: "Pizza",
        category_id: foodCategory._id,
        price: 12.49,
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/045/383/391/small/a-cheesy-delicious-pizza-with-tasty-pepperoni-on-a-transparent-background-png.png",
      },
      {
        name: "Fries",
        category_id: foodCategory._id,
        price: 4.49,
        image:
          "https://static.vecteezy.com/system/resources/previews/025/062/054/non_2x/french-fries-on-white-bowl-isolated-on-transparent-background-fried-fast-food-snack-isolated-food-photography-junk-food-fried-potatoes-free-png.png",
      },
      {
        name: "Sandwich",
        category_id: foodCategory._id,
        price: 7.29,
        image:
          "https://png.pngtree.com/png-clipart/20241108/original/pngtree-free-photo-tasty-sandwiches-on-the-plate-white-background-png-image_16747513.png",
      },
      {
        name: "Salad",
        category_id: foodCategory._id,
        price: 6.99,
        image:
          "https://png.pngtree.com/png-vector/20240510/ourmid/pngtree-veg-caesar-salad-png-image_12372147.png",
      },
      {
        name: "Taco",
        category_id: foodCategory._id,
        price: 5.99,
        image:
          "https://static.vecteezy.com/system/resources/previews/044/280/217/non_2x/taco-on-isolated-transparent-background-png.png",
      },
      {
        name: "Coffee",
        category_id: beverageCategory._id,
        price: 2.99,
        image:
          "https://media.istockphoto.com/id/1437696022/photo/americano-coffee-cup-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=ZjgyvHe1GzplBmN5E5qZukHd6E0fIXLGLij9Ue7uNHs=",
      },
      {
        name: "Tea",
        category_id: beverageCategory._id,
        price: 2.49,
        image:
          "https://media.istockphoto.com/id/177555555/photo/black-tea-in-glass-cup.jpg?s=612x612&w=0&k=20&c=2Flt5yTypvLnfe0ZLvA6dWI3gd2RnNpTMKUBQ1gAAgM=",
      },
      {
        name: "Orange Juice",
        category_id: beverageCategory._id,
        price: 3.49,
        image:
          "https://static.vecteezy.com/system/resources/previews/048/340/267/non_2x/orange-juice-with-straw-and-orange-slice-on-transparent-background-free-png.png",
      },
      {
        name: "Soda",
        category_id: beverageCategory._id,
        price: 1.99,
        image:
          "https://www.shutterstock.com/image-photo/helsingborg-sweden-january-21-2014-600nw-174151319.jpg",
      },
      {
        name: "Bottle Water",
        category_id: beverageCategory._id,
        price: 1.49,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ01vrOcKxckcPshyKCIQFInhEaKV3z8gAuw&s",
      },
    ];

    await MenuModel.insertMany(menus);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Failed to seed database:", err);
  } finally {
    process.exit(); // Exit the process after seeding
  }
}

seedDatabase();
