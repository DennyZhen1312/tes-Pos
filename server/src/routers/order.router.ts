import { Router, Request, Response } from "express";
import { OrderModel, PaymentModel } from "../models";

export const orderRouter = Router();

// Create a new order
orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { orderNumber, orderAmount, customerPaidAmount, customerChange, items } =
      req.body;

    // Create the order
    const newPayment = new PaymentModel({
      orderNumber,
      orderAmount,
      customerPaidAmount,
      customerChange,
    });

    const savedPayment = await newPayment.save();

    // Save order items
    const orderItems = items.map((item: any) => ({
      payment_id: savedPayment._id,
      menu_id: item.menu_id,
      menuItemImage: item.menuItemImage,
      menuItemName: item.menuItemName,
      menuItemPrice: item.menuItemPrice,
      quantity: item.quantity,
      subtotal: item.menuItemPrice * item.quantity,
    }));

    await OrderModel.insertMany(orderItems);

    res.status(201).json({ message: "Order placed successfully!", savedPayment  });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch latest order
orderRouter.get("/latest", async (req: Request, res: Response) => {
  try {
    const latestOrder = await PaymentModel.findOne().sort({ created_at: -1 });

    if (!latestOrder) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    res.status(200).json({ order: latestOrder });
  } catch (error) {
    console.error("Error fetching latest order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Fetch order by order number
orderRouter.get("/:orderNumber", async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    // Find the order payment
    const order = await PaymentModel.findOne({ orderNumber });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return
    }

    const orderItems = await OrderModel.find({ payment_id: order._id });

    // Calculate total items
    const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);

     // Calculate total cost
     const totalCost = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({ order, items: orderItems, totalItems, totalCost });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

orderRouter.get("/", async (_: Request, res: Response) => {
  const orders = await PaymentModel.find()
  res.status(200).json(orders);
});
