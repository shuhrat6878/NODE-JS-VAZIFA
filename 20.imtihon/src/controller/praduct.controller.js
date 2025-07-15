import { isValidObjectId } from "mongoose";
import praductModel from "../models/praduct.model.js";


export class PraductControl {
    async createPraduct(req, res) {
        try {
            const praduct = await praductModel.findOne({ name: req.body.name });
            if (praduct) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "praduct name already exists"
                })
            }
            const newpraduct = await praductModel.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: "succes ajoyib",
                data: newpraduct
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async getAllPraduct(_,res){
        try {
            const getPraduct = await praductModel.find().populate("categoy_id").populate("Izoh")

            return res.status(200).json({
                statusCode:200,
                message:" succes ajoyib",
                data: getPraduct
            })
        } catch (error) {
           return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            }); 
        }
    }

    async getAllByIdPraduct(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const data = await praductModel.findById(id).populate("categoy_id").populate("Izoh")
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
    async updatePraduct(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const data = await praductModel.findById(id);
            if(!data){
                return res.status(404).json({
                    statusCode:404,
                    message:"data not faunt"
                });
            }
            const newdata = await praductModel.findByIdAndUpdate(id, req.body, {new: true});
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
    async deletePraduct(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode:400,
                    message:"id not faunt"
                });
            }

            const deletePraduct = await praductModel.findByIdAndDelete(id);
            if(!deletePraduct){
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