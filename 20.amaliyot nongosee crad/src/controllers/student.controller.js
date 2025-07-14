import { isValidObjectId } from "mongoose";
import { modelStudent } from "../models/student.model.js";

export class Student {
  async createStudent(req, res) {
    try {
      const oldStudent = await modelStudent.findOne({ name: req.body?.full_name });
      if (oldStudent) {
        return res.status(409).json({
          statusCode: 409,
          message: "Student name already exists"
        })
      }
      const newStudent = await modelStudent.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newStudent
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }



  async GetAllStudent(_, res) {
    try {
      const data = await modelStudent.find().populate(
        {
          path: 'guruh_id',
          populate: { path: 'univer_id' }
        }
      );
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: data
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }


  async getByIdStudent(req, res) {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Bad reqvest'
        })
      }
      const data = await modelStudent.findById(id).populate({ path: 'guruh_id', populate: { path: 'univer_id' } });
      if (!data) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Not found'
        })
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: data
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }



  async updateStudent(req, res) {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Bad reqvest'
        })
      }
      const updateData = await modelStudent.findByIdAndUpdate(id, req.body, { new: true });
      if (!updateData) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Not found'
        })
      }
      const data = await modelStudent.findById(id).populate('guruh_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }


  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Bad reqvest'
        })
      }
      const check = await modelStudent.findByIdAndDelete(id);
      if (!check) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Not found'
        })
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {}
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }
}