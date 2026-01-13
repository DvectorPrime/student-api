import path from "node:path"
import Papa from "papaparse"
import fs from "node:fs"


export function getDataFromCsv(){
    const csvUrl = path.join(process.cwd(), "data", "students.csv")
    const file = fs.createReadStream(csvUrl)

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: function(results){
                console.log(results.data)
                resolve(results.data)
            },
            error: function(err){
                reject(err)
            }
        })
    })
}
