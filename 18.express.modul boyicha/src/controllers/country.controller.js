import { isValidObjectId } from "mongoose";
import { modelCountry } from "../models/country.model.js";

export class Country {
    async createCountry(req, res) {
        try {
            const nameData = await modelCountry.findOne({ name: req.body?.name });
            if (nameData) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'This name yes'
                })
            }
            const newCountry = await modelCountry.create(req.body)
            return res.status(201).json({
                statusCode: 201,
                message: "success",
                data: newCountry
            });
        } catch (error) {
            return res.ststus(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }

    
    async getALlCountry(_, res) {
        try {
            const data = await modelCountry.find().populate('sities');
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }


    async getByIdCountry(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const data = await modelCountry.findById(id).populate('sities');
            if (!data) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            })
        } catch (error) {
            return res.ststus(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }


    async updateCountry(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const check = await modelCountry.findById(id);
            if (!check) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            const data = await modelCountry.findByIdAndUpdate(id, req.body, { new: true });
            if (!data) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            })
        } catch (error) {
            return res.ststus(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }


    async deleteCountry(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const check = await modelCountry.findOne({_id:id});
            if (!check) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            await modelCountry.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data:{}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }
}