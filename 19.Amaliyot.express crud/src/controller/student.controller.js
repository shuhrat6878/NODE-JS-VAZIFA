import Student from "../models/student.model.js"
import { isValidObjectId } from "mongoose";


export class StudentController {

    async createStudent(req, res){
        try {
            const existsStudent =await Student.findOne({name: req.body?.name});
            if(existsStudent){
                return res.status(409).json({
                    statusCode:409,
                    message: 'student allaqachon mavjud'
                });
            }
            const newStudent =await Student.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'muaffaqiyatli',
                data: newStudent
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori bu'
            })
        }
    }
     
    async getAllStudent(_,res){
        try {
            const  getStudent = await Student.find().populate({
                path: 'guruh_id',
                populate: { path: 'universitet_id' }
            });
            return res.status(200).json({
                statusCode: 200,
                message: "muaffaqqiyatli",
                data: getStudent
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'internal server errrori buuuuuuuuuu'
            });
        }
    }

    async getAllStudentBydId (req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "invalid objekt id hatoooooo"
                });
            }
            const getStudent =await Student.findById(id).populate({ path: 'guruh_id',
                 populate: { 
                    path: 'universitet_id' 
                } 
            });
            if(!getStudent){
                return res.status(404).json({
                    statusCode: 404,
                    message: "Student not faund"
                });
            }
            return res.status(200).json({
                statusCode:200,
                message: "mufaqiyatli",
                data: getStudent

            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuuuuuuu'
            })
        }
    }

    async updateStudent (req, res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message:" id not faund kelmadi"
                });
            }
            const student = await Student.findById(id).populate('guruh_id');
            if(!student){
                return res.status(404).json({
                    statusCode: 404,
                    message:" unver not faund yoooo",

                })
            }
            const updateStudent =await Student.findByIdAndUpdate(id, req.body,{new: true});
            return res.status(200).json({
                statusCode: 200,
                message:" muaffaqiyatli bajarildi",
                data: updateStudent
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'internal server errrori buuuuu'
            });
        }

    }

    async deleteStudent (req,res){
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                    statusCode: 400,
                    message: "id not found"
                });
            }
            const student = await Student.findById(id);
            if(!student){
                return res.status(4).json({
                    statusCode: 4004,
                    message: "student not found"
                });
            }
            await Student.findByIdAndDelete(id);
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