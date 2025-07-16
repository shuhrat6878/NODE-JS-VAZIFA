import Author from "../models/authors.models.js";
import { isValidObjectId } from "mongoose";

export class AuthorController {
  create = async (req, res) => {
    try {
      const newAuthor = await Author.create(req.body);
      res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newAuthor,
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
      const authors = await Author.find();
      res.json({
        statusCode: 200,
        message: "success",
        data: authors,
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

      const author = await Author.findById(id);
      if (!author) {
        return res.status(404).json({
          statusCode: 404,
          message: "Author not found",
        });
      }

      res.json({
        statusCode: 200,
        message: "success",
        data: author,
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

      const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedAuthor) {
        return res.status(404).json({
          statusCode: 404,
          message: "Author not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatedAuthor,
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

      const deleted = await Author.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          statusCode: 404,
          message: "Author not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Author deleted",
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
