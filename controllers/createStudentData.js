import fs from "node:fs"
import { getDataFromCsv } from "../utils/getDataFromCsv.js"
import { verifyQueryParams } from "../utils/verifyQueryParams.js"

export async function createStudentData(req, res){
    const existingData = await getDataFromCsv()

    {
        const {
           name, matricNo, gender, age, department, 
           state, residence, modeOfEntry, 
           utmeScore, putmeScore, 
           familySize, monthlyStipend
        } = req.body

        if (!matricNo || !name || !department || !gender){
            return res.status(500).json({error : "Matric No, Gender, Name & Department is required"})
        }

        const error = verifyQueryParams(req.body, res)

        if (error) {
            return error
        }

        for (const student of existingData){
            if (student.matricNo === matricNo.toString()){
                return res.status(500).json({error : "Student Already exists in database. Use /edit endpoint instead"})}
        }

        const writeData = {
            name: name || "",
            matricNo: matricNo?.toString() || "",
            gender: gender || "",
            age: age?.toString() || "",
            department: department || "",
            state: state || "",
            residence: residence || "",
            modeOfEntry: modeOfEntry || "",
            utmeScore: utmeScore?.toString() || "",
            putmeScore: putmeScore?.toString() || "",
            familySize: familySize?.toString() || "",
            monthlyStipend: monthlyStipend?.toString() || "",
        }

        try{
            const newRow = `${Date.now()},` + Object.values(writeData).join(",") + "\n"
    
            fs.appendFileSync("data/students.csv", newRow)

            res.status(201).json({message: "Student data created successfully"})

        }catch(err){
            console.log(err)
            return res.status(500).json({error: "An error occurred while writing to database"})
        }
    } 
}