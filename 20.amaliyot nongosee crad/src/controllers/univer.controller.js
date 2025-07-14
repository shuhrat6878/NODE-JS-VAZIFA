import { isValidObjectId } from "mongoose";
import {modelUnver} from "../models/univer.model.js";

export class Univer {
  async createUniver(req, res) {
    try {
      const oldUnver=await modelUnver.findOne({name:req.body.name});
      if(oldUnver){
        return res.status(409).json({
          statusCode:409,
          message:"City name already exists"
        })
      }
      const newUniver = await modelUnver.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newUniver
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }



  async GetAllUniver(_, res) {
    try {
      const data = await modelUnver.find().populate({
        path: 'guruh',
        populate: {
          path: 'student'
        }
      });
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


  async getByIdUniver(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const data = await modelUnver.findById(id).populate({
        path: 'guruh',
        populate: {
          path: 'student'
        }
      });
      if(!data){
        return res.status(404).json({
          statusCode:404,
          message:'Not found'
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



  async updateUniver(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const updateData = await modelUnver.findByIdAndUpdate(id,req.body,{new:true});
      if(!updateData){
        return res.status(404).json({
          statusCode:404,
          message:'Not found'
        })
      }
      const data = await modelUnver.findById(id);
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
  

  async deleteUniver(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const check = await modelUnver.findByIdAndDelete(id);
      if(!check){
        return res.status(404).json({
          statusCode:404,
          message:'Not found'
        })
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data:{}
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }
}