import express from "express"
import { getStudents } from "../controllers/getStudents.js"

export const apiRouter = express.Router()

apiRouter.get('/', getStudents)