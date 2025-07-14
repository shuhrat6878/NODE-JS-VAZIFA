import Universitet from "../models/unversitet.model.js";
import { isValidObjectId } from "mongoose";


export class UniversitetController {

    async createUniveristet(req, res){
        try {
            const existsUniver =await Universitet.findOne({name: req.body?.name});
            if(existsUniver){
                return res.status(409).json({
                    statusCode:409,
                    message: 'Universitet allaqachon mavjud'
                });
            }
            const newUnever =await Universitet.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'muaffaqiyatli',
                data: newUnever
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori bu'
            })
        }
    }
     
    async getAllUniversitet(_,res){
        try {
            const  getUiver = await Universitet.find();
            return res.status(200).json({
                statusCode: 200,
                message: "muaffaqqiyatli",
                data: getUiver
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'internal server errrori buuuuuuuuuu'
            });
        }
    }

    async getAllUniversitetBydId (req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objekt id hatoooooo"
                });
            }
            const getUiver =await Universitet.findById(id);
            if(!getUiver){
                return res.status(404).json({
                    statusCode: 404,
                    message: "Unversitet not faund"
                });
            }
            return res.status(200).json({
                statusCode:200,
                message: "mufaqiyatli",
                data: getUiver

            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuuuuuuu'
            })
        }
    }

    async updateUniversitet (req, res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message:" id not faund kelmadi"
                });
            }
            const unever = await Universitet.findById(id);
            if(!unever){
                return res.status(404).json({
                    statusCode: 404,
                    message:" unver not faund yoooo",

                })
            }
            const updateUnver =await Universitet.findByIdAndUpdate(id, req.body,{new: true});
            return res.status(200).json({
                statusCode: 200,
                message:" muaffaqiyatli bajarildi",
                data: updateUnver
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuu'
            });
        }

    }

    async deleteUnversitet (req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not found"
                });
            }
            const unver = await Universitet.findById(id);
            if(!unver){
                return res.status(4).json({
                    statusCode: 4004,
                    message: "unversitet not found"
                });
            }
            await Universitet.findByIdAndDelete(id);
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


};