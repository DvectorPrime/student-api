import { filterIfIncluded } from "../utils/filterIfIncluded.js"
import { getDataFromCsv } from "../utils/getDataFromCsv.js"

export const getStudents = async (req, res) => {
    try {
        let studentData = await getDataFromCsv()

        const filters = req.query

        const separateFiltersExact = ["age", "utmeScore", "putmeScore", "deniedAdmissionCount", "utmeWrites", "familySize", "monthlyStipend", "databudget"]
        const separateFiltersGreaterThan = ["minAge", "minUtmeScore", "minPutmeScore", "minMonthlyStipend"]
        const separateFiltersLessThan = ["maxAge", "maxUtmeScore", "maxPutmeScore", "maxMonthlyStipend"]

        for (const filter of Object.keys(filters)){
            if(separateFiltersExact.includes(filter)){

            } else if (separateFiltersLessThan.includes(filter)){
                
            } else if (separateFiltersGreaterThan.includes(filter)){

            } else {
                studentData = filterIfIncluded(studentData, filter, filters[filter])
            }
        }
        
        res.json(studentData)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to read student data' })
    }

}