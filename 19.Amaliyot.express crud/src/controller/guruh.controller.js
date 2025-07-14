import { isObjectIdOrHexString } from "mongoose";
import Student from '../models/student.model.js'
export class GuruhController {
    async createGuruh(req,res){
        try {
            const newStudent = await Student.create(req.bod)
            
        } catch (error) {
            return res.status(500).json({
                statuscode:500,
                message: error.message || "internal server erroor"
            });
        }
    }
}