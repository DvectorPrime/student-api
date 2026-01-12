import express from "express"
import { apiRouter } from "./routes/apiRouter.js"

const PORT = 8000

const app = express()

app.use(express.json())

app.use("/api/students", apiRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
}).on("error", (err) => {
    console.log(`An error occurred : ${err}`)
})

