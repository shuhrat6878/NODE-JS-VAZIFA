import { isValidObjectId } from "mongoose";
import {modelGuruh}  from "../models/guruh.model.js"

export class Guruh {
    async createGuruh(req, res) {
        try {
            const nameData = await modelGuruh.findOne({ name: req.body?.name });
            if (nameData) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'This name yes'
                })
            }
            const newGuruh = await modelGuruh.create(req.body)
            return res.status(201).json({
                statusCode: 201,
                message: "success",
                data: newGuruh
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }

    
    async getALlGuruh(_, res) {
        try {
            const data = await modelGuruh.find().populate('univer_id').populate('student');
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


    async getByIdGuruh(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const data = await modelGuruh.findById(id).populate('univer_id').populate('student');
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
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }


    async updateGuruh(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const check = await modelGuruh.findById(id);
            if (!check) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            const data = await modelGuruh.findByIdAndUpdate(id, req.body, { new: true });
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
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "Error Creted country "
            });
        }
    }


    async deleteGuruh(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Bad reavest'
                })
            }
            const check = await modelGuruh.findOne({_id:id});
            if (!check) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Not found'
                })
            }
            await modelGuruh.findByIdAndDelete(id);
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