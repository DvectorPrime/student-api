import express from "express"
import { getAllStudentsControllers } from "../controllers/getAllStudentsController.js"
import { getAllDataGreaterController } from "../controllers/getAllDataGreaterController.js"

export const apiRouter = express.Router()

apiRouter.get('/', getAllStudentsControllers)

apiRouter.get('/greater', getAllDataGreaterController)