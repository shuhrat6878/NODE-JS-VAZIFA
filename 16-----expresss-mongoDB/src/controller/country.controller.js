import Country from "../models/country.model.js";
import { isValidObjectId } from "mongoose";

export class CountryController {
    async createCountry(req,res){
        try {
            const existsCountry = await Country.findOne({name:req.body?.name});
            if(existsCountry){
                return res.status(409).json({
                    statusCode: 409,
                    message:'country oldin qoshilgan'
                });
            }
            const newCountry = await Country.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message:" bajarildi ok",
                data: newCountry
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message ||"internal server error"
            })
        }
    }

    async getAllCountry(req,res){
        try {
            const country = await Country.find();
            return res.status(200).json({
                statusCode: 200,
                message:"ajoyib sucsesss",
                data: country
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message ||"internal server error"
            });
        }
    }

    async getAllCountryById(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid id"
                });
            }
            const country = await Country.findById(id);
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: "country not faund topilmadi"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message:'ajoyib sucsesss',
                data: country
            })
            
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message ||"internal server error"
            });
        }
    }

    async updateCountry(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid id"
                });
            }
            const country = await Country.findById(id);
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: "country not faund topilmadi"
                });
            }
            const updateCountry = await Country.findByIdAndUpdate(id,req.body, {new: true});
            return res.status(200).json({
                statusCode: 200,
                message:"ajoyib sucses",
                data: updateCountry
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message ||"internal server error"
            });
        }
    }

    async deleteCoutry (req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid id"
                });
            }
            const country = await Country.findById(id);
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: "country not faund topilmadi"
                });
            }
            await Country.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode:200,
                message:"sucses",
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message ||"internal server error"
            });
        }
    }
}