import path from "node:path"
import Papa from "papaparse"
import fs from "node:fs"
import { filterData } from "../utils/filterData.js"

export async function getAllStudentsControllers(req, res) {
    const queryParams = req.query 

    const csvUrl = path.join("data", "students.csv")

    const file = fs.createReadStream(csvUrl)
    
    Papa.parse(file, {
        header: true,
        complete: function(results){
            const data = filterData(results.data, queryParams, results.meta.fields)
            res.json(data)
        }
    })
} 