import { isValidObjectId } from "mongoose";
import izohModel from "../models/review.model.js";


export class izohControl {
    async createiIzoh(req, res) {
        try {
            const izoh = await izohModel.findOne({ name: req.body.name });
            if (izoh) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "izoh name already exists"
                })
            }
            const newizoh = await izohModel.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: "succes ajoyib",
                data: newizoh
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async getAllIzoh(_, res) {
        try {
            const getizoh = await izohModel.find().populate(
                {
                    path: 'praduct_id',
                    populate: { path: 'categoy_id' }
                }
            );
            return res.status(200).json({
                statusCode: 200,
                message: " succes ajoyib",
                data: getizoh
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }

    async getAllByIdIzoh(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not faunt"
                });
            }

            const data = await izohModel.findById(id).populate(
                {
                    path: 'praduct_id',
                    populate: { path: 'categoy_id' }
                }
            );
            if (!data) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "data not faunt"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: " succes ajoyib",
                data: data
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async updateIzoh(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not faunt"
                });
            }

            const data = await izohModel.findById(id);
            if (!data) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "data not faunt"
                });
            }
            const newizoh = await izohModel.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: " succes ajoyib",
                data: newizoh
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }
    async deleteIzoh(req, res) {
        try {
            const id = req.params?.id;
            if (!isValidObjectId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not faunt"
                });
            }

            const deleteIzoh = await izohModel.findByIdAndDelete(id);
            if (!deleteIzoh) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "data not faunt"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "succes ucdi",
                data: {}
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error buu"
            });
        }
    }


}