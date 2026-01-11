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
                console.log(filter)
                studentData = studentData.filter(student => {
                    const dbMatricNo = parseInt(student[filter])
                    const normalizedInput = parseInt(filters[filter])
                    console.log(dbMatricNo, normalizedInput, dbMatricNo === normalizedInput)
                    return dbMatricNo === normalizedInput
                })

            } else if (separateFiltersLessThan.includes(filter)){
                
            } else if (separateFiltersGreaterThan.includes(filter)){

            } else {
                studentData = studentData.filter(student => {
                    const dbMatricNo = student[filter].toString().toLowerCase().trim().normalize('NFC')
                    const normalizedInput = filters[filter].toString().toLowerCase().trim().normalize('NFC')
                    return dbMatricNo.includes(normalizedInput)
                })
            }
        }

        res.json(studentData)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to read student data' })
    }

}