import Book from "../models/books.models.js";
import { isValidObjectId } from "mongoose";

export class BookController {
  create = async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newBook,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  };

  getAll = async (_, res) => {
    try {
      const books = await Book.find();
      res.json({
        statusCode: 200,
        message: "success",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({
          statusCode: 404,
          message: "Book not found",
        });
      }

      res.json({
        statusCode: 200,
        message: "success",
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).json({
          statusCode: 404,
          message: "Book not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedBook,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params?.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ID",
        });
      }

      const deleted = await Book.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          statusCode: 404,
          message: "Book not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Book deleted",
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error: error.message || "internal server error",
      });
    }
  };
}
