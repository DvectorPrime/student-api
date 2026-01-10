import path from "node:path"
import Papa from "papaparse"
import fs from "node:fs"
import { filterGreaterData } from "../utils/filterGreaterData.js"

export function getAllDataGreaterController(req, res){
     const queryParams = req.query 
    
    const csvUrl = path.join("data", "students.csv")

    const file = fs.createReadStream(csvUrl)
    
    Papa.parse(file, {
        header: true,
        complete: function(results){
            const data = filterGreaterData(results.data, queryParams)
            res.json(data)
        }
    })
}