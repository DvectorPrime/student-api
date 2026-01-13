import fs from "node:fs"
import { getDataFromCsv } from "../utils/getDataFromCsv.js"

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

        if (![matricNo, age, utmeScore, putmeScore, familySize, monthlyStipend].every(val => !val || typeof val === "number")) {
            return res.status(500).json({error : "All numeric fields must be numbers"})
        } else if (matricNo <= 100000 || matricNo >= 999999){
            return res.status(500).json({error : "Invalid Matric No"})
        } else if (age && (age < 16 || age > 80)){
            return res.status(500).json({error: "Age is out of unversity age bound"})
        } else if ( residence && !["On Campus", "Off Campus"].includes(residence)){
            return res.status(500).json({error : "Residence should return 'Off Campus' or 'On Campus'"})
        } else if (modeOfEntry && !["UTME", "PUTME", "DE"].includes(modeOfEntry)){
            return res.status(500).json({error: "Invalid mode of entry"})
        } else if (utmeScore < 200 || utmeScore > 400){
            return res.status(500).json({error: "UTME Score is out of bounds"})
        } else if (putmeScore < 50 || putmeScore > 100){
            return res.status(500).json({error: "PUTME Score is out of bounds"})
        } else if (familySize && familySize < 1){
            return res.status(500).json({error: "Invalid family size"})
        } else if(gender && !["Male", "Female", "Other"].includes(gender)){
            return res.status(500).json({ error: "Invalid gender value"}) 
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