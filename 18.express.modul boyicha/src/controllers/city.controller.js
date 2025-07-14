import { isValidObjectId } from "mongoose";
import { cityModel } from "../models/city.model.js";

export class City {
  async createCity(req, res) {
    try {
      const oldCity=await cityModel.findOne({name:req.body.name});
      if(oldCity){
        return res.status(409).json({
          statusCode:409,
          message:"City name already exists"
        })
      }
      const newCity = await cityModel.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newCity
      })
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    };
  }



  async GetAllCity(_, res) {
    try {
      const data = await cityModel.find().populate('country_id');
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


  async getByIdCity(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const data = await cityModel.findById(id).populate('country_id');
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



  async updateCity(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const updateData = await cityModel.findByIdAndUpdate(id,req.body,{new:true});
      if(!updateData){
        return res.status(404).json({
          statusCode:404,
          message:'Not found'
        })
      }
      const data = await cityModel.findById(id).populate('country_id');
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
  

  async deleteCity(req, res) {
    try {
      const id=req.params.id;
      if(!isValidObjectId(id)){
        return res.status(400).json({
          statusCode:400,
          message:'Bad reqvest'
        })
      }
      const check = await cityModel.findByIdAndDelete(id);
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