import City from "../models/city.model.js";
import { isValidObjectId } from "mongoose";


export class CityController{
    async createCity(req,res){
        try {
            const existsCity = await City.findOne({name:req.body?.name});
            if(existsCity){
                return res.status(409).json({
                    statusCode: 409,
                    message:'sity oldin qoshilgan'
                });
            }
            const newCity = await City.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message:" sucses aajoyib",
                data: newCity
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
            });
        }
    }

    async getAllCity(_,res){
        try {
            const newcity = await City.find().populate('country_id');
            return res.status(200).json({
                statusCode:200,
                message: "succes",
                data: newcity
            });
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
            });
        }
    }
    async getCityById(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            console.log(id)
            const city = await City.findById(id).populate('country_id');
            if (!city) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: city
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error || 'Internal server error'
            });
        }
    }

    async updateCity(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const updatedCity = await City.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCity) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
            const city = await City.findById(id).populate('country_id');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: city
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteCity(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId'
                });
            }
            const city = await City.findByIdAndDelete(id);
            if (!city) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'City not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

}