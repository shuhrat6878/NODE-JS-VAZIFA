import Country from "../models/country.model.js";
import { isValidObjectId} from 'mongoose';

export class CountryController {
    async createCountry(req,res){
        try {
            const existsCountry = await Country.findOne({ name: req.body?.name});
            if (existsCountry){
                return res.status(409).json({
                    statusCode: 409,
                    message: "country alerady aded    xattto"
                })
            }
            const newCountry = await Country.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                data: newCountry
            })
            
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
            })
        }
    }

    async getAllCountries(_,res){
        try {
            const countries = await Country.find();
            return res.status(200).json({
                statusCode: 200,
                message: "sucsess",
                data: countries
            });
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
        })
     }
    }

    async getCountryById(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objectId"
                })
            }
            const country = await Country.findById(id);
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: 'Country not found'
                });
            }
            return res.status(200).json({
                statusCode:200,
                message: "sucess",
                data: country
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
         })
        }
    }

    async updateCountry(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objectId"
                })
            }
            const country = await Country.findById(id);
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: 'Country not found'
                });
            }
            const updateCountry = await Country.findByIdAndUpdate(id,req.body,{new:true});
            return res.status(200).json({
                statusCode: 200,
                message: "sucses",
                data: updateCountry
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
         })
        }
    }

    async deleteCountry(req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objectId"
                })
            }
            const country = await Country.findById(id);
            console.log(country);
            
            if(!country){
                return res.status(404).json({
                    statusCode:404,
                    message: 'Country not found'
                });
            }
            const deletedCountry = await Country.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: "sucses",
                data: {}
            })

        } catch (error) {
           return res.status(500).json({
                statusCode:500,
                message: error.message || "internal server error"
         }) 
        }
    }

}