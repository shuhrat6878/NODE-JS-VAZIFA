import { isValidObjectId } from "mongoose";
import categoryModel from "../models/category.model.js";


export class CategoryControl {
    async createCategory(req, res) {
        try {
            const categry = await categoryModel.findOne({ name: req.body.name });
            if (categry) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "category name already exists"
                })
            }
            const newcategory = await categoryModel.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: "succes ajoyib",
                data: newcategory
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async getAllCategory(_,res){
        try {
            const getCategory = await categoryModel.find().populate({
                path:"Praduct",
                populate:{
                    path:"Izoh"
                }
            });
            return res.status(200).json({
                statusCode:200,
                message:" succes ajoyib",
                data: getCategory
            })
        } catch (error) {
           return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            }); 
        }
    }

    async getAllByIdCategory(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const data = await categoryModel.findById(id).populate({
                path:"Praduct",
                populate:{
                    path:"Izoh"
                }
            });
            if(!data){
                return res.status(404).json({
                    statusCode:404,
                    message:"data not faunt"
                });
            }
            return res.status(200).json({
                statusCode:200,
                message:" succes ajoyib",
                data: data
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async updateCategory(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const data = await categoryModel.findById(id);
            if(!data){
                return res.status(404).json({
                    statusCode:404,
                    message:"data not faunt"
                });
            }
            const newdata = await categoryModel.findByIdAndUpdate(id, req.body, {new: true});
            return res.status(200).json({
                statusCode:200,
                message:" succes ajoyib",
                data: newdata
            });  
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async deleteCategory(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const deletData = await categoryModel.findByIdAndDelete(id);
            if(!deletData){
                return res.status(404).json({
                    statusCode:404,
                    message:"data not faunt"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message:"succes ucdi",
                data:{}
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }


}