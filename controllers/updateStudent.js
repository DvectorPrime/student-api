import fs from "node:fs"
import path from "node:path"
import { getDataFromCsv } from "../utils/getDataFromCsv.js"

export async function updateStudent(req, res){
    const dataupdate = req.body

    const {matricNo} = dataupdate
    const validFilters = ["name", "matricNo", "gender", "age", "department", "state", "residence", "utmeScore", "putmeScore", "familySize", "monthlyStipend", "modeOfEntry"]

    const fileData = await getDataFromCsv()

    if(!matricNo){
        return res.status(422).json({error : "Matric No must be provided to student record"})
    }
    
    try{
        const idx = fileData.findIndex(r => r.matricNo === matricNo.toString())

        if (idx === -1){
            return res.status(404).json({ error: "Student not found" })
        }

        const updatedRecord = { ...fileData[idx] }

        for (const key of Object.keys(dataupdate)){
            if (!validFilters.includes(key)) continue

            if (key === 'matricNo'){
                const newMatric = dataupdate[key].toString()
                const duplicate = fileData.find((r, i) => r.matricNo === newMatric && i !== idx)
                if (duplicate){
                    return res.status(409).json({ error: "matricNo already exists for another student" })
                }
                updatedRecord.matricNo = newMatric
            } else {
                updatedRecord[key] = dataupdate[key] == null ? "" : dataupdate[key].toString()
            }
        }

        fileData[idx] = updatedRecord

        // Rebuild CSV content using existing header order
        const csvPath = path.join(process.cwd(), "data", "students.csv")
        const fileRaw = fs.readFileSync(csvPath, { encoding: 'utf8' })
        const lines = fileRaw.split(/\r?\n/)
        const headerLine = lines[0]
        const headers = headerLine.split(',')

        const rows = fileData.map(r => headers.map(h => (r[h] ?? '').toString()).join(','))
        const newCsv = headerLine + '\n' + rows.join('\n') + '\n'

        fs.writeFileSync(csvPath, newCsv, { encoding: 'utf8' })

        return res.json({ message: 'Student updated successfully', student: updatedRecord })

    } catch (err){
        console.error(err)
        return res.status(500).json({ error: 'Failed to update student record' })
    }

}