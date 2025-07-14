import { isValidObjectId } from "mongoose";
import Guruh from '../models/guruh.model.js'
export class GuruhController {
    async createGuruh(req,res){
        try {
            const guruhName = await Guruh.create({name:req.bod?.name})
            if(guruhName){
                res.status(400).json({
                    statusCode:400,
                    message: "bunday name mavjufd"
                })
            }
            const newGuruh =await Guruh.create(req.body);
            return res.status(201).json({
                statusCode:201,
                message: "sucses ajoyib",
                data: newGuruh
            })
        } catch (error) {
            return res.status(500).json({
                statuscode:500,
                message: error.message || "internal server erroor"
            });
        }
    }

    async getAllGuruh(req,res){
        try {
            const  getGuruh = await Guruh.find().populate('univer_id').populate('student');
            return res.status(200).json({
                statusCode: 200,
                message: "muaffaqqiyatli",
                data: getGuruh
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'internal server errrori buuuuuuuuuu'
            });
        }
    }

    async getAllGuruhById(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objekt id hatoooooo"
                });
            }
            const getGuruh=await Universitet.findById(id).populate('univer_id').populate('student');
            if(!getGuruh){
                return res.status(404).json({
                    statusCode: 404,
                    message: "guruh not faund"
                });
            }
            return res.status(200).json({
                statusCode:200,
                message: "mufaqiyatli",
                data: getGuruh

            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuuuuuuu'
            });
        }
    }

    async updateGruh(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message:" id not faund kelmadi"
                });
            }
            const guruh = await Guruh.findById(id);
            if(!guruh){
                return res.status(404).json({
                    statusCode: 404,
                    message:" guruh not faund yoooo",

                })
            }
            const updateGuruh =await Guruh.findByIdAndUpdate(id, req.body,{new: true});
            return res.status(200).json({
                statusCode: 200,
                message:" muaffaqiyatli bajarildi",
                data: updateGuruh
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuu'
            });
        }
    }

    async deletegGuruh(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not found"
                });
            }
            const guruh = await Guruh.findById(id);
            if(!guruh){
                return res.status(4).json({
                    statusCode: 4004,
                    message: "guruh not found"
                });
            }
            await Guruh.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: "sucsesssssss",
                data: {}
                
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuu'
            });
        }
    
    }
}