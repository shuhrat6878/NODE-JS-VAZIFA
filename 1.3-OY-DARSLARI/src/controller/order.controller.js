import Order from "../models/orders.models.js";
import { isValidObjectId } from "mongoose";

export class OrderController {
  async create(req, res) {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newOrder,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  }

  async getAll(_, res) {
    try {
      const orders = await Order.find().populate("book_id");
      res.json({
        statusCode: 200,
        message: "success",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const order = await Order.findById(id).populate("book_id");
      if (!order) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
        });
      }

      res.json({
        statusCode: 200,
        message: "success",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const deleted = await Order.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order deleted",
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  }
}
