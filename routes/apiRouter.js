import express from "express"
import { getStudents } from "../controllers/getStudents.js"
import { createStudentData } from "../controllers/createStudentData.js"
import { updateStudent } from "../controllers/updateStudent.js"

export const apiRouter = express.Router()

apiRouter.get('/', getStudents)

apiRouter.post('/create', createStudentData)
apiRouter.patch('/edit', updateStudent)