import express from 'express'
import { write, read } from "./write-ride.js";


const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const students = await read();
        const newStudent = {
            id: !students.length ? 1 : students.at(-1).id + 1,
            ...req.body
        };
        students.push(newStudent);
        await write(students);
        return res.status(201).json({
            data: newStudent
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolikmyuzberdi"
        })

    }
});


app.get('/', async (req, res) => {
    try {
        const students = await read()
        return res.status(200).json({
            data: students
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolik"
        });
    }
});


app.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const students = await read();
        const student = students.find((box) => box.id === id);
        if (!student) {
            return res.status(404).json({
                massage: "foydalanuvchi topilmadi"
            });

        }
        return res.status(200).json({
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolik"
        });

    }
});


app.put('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const students = await read();
        const studIndex = students.findIndex((user) => user.id === id);
        if (studIndex === -1) {
            return res.status(404).json({
                message: "foydalanuvchi toplmadi"
            });

        }
        students[studIndex] = { id, ...req.body };
        await write(students);
        return res.status(200).json({
            data: students[studIndex]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolik boru"
        })
    }
});

app.patch('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const students = await read();
        const stIndex = students.findIndex((user) => user.id === id);
        if (stIndex === -1) {
            return res.status(404).join({
                message: "foydalanuvchi topilmadiku"
            });
        }
        students[stIndex] = { ...students[stIndex], ...req.body }
        await write(students);

        return res.status(200).join({
            data: students[stIndex]
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolikkk"
        })
    }
});

app.listen(3000, () => console.log("sever 3000 portda ishladi"))