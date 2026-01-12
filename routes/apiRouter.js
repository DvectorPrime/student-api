import express from "express"
import { getStudents } from "../controllers/getStudents.js"
import { createStudentData } from "../controllers/createStudentData.js"

export const apiRouter = express.Router()

apiRouter.get('/', getStudents)

// apiRouter.post("/edit", editStudentData)
apiRouter.post('/create', createStudentData)