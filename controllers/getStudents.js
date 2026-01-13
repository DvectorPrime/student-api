import { getDataFromCsv } from "../utils/getDataFromCsv.js"

export const getStudents = async (req, res) => {
    try {
        let studentData = await getDataFromCsv()

        const filters = req.query

        const separateFiltersExact = ["age", "utmeScore", "putmeScore", "familySize", "monthlyStipend"]
        const separateFiltersGreaterThan = ["minAge", "minUtmeScore", "minPutmeScore", "minMonthlyStipend", "mindataBudget", "minFamilySize"]
        const separateFiltersLessThan = ["maxAge", "maxUtmeScore", "maxPutmeScore", "maxMonthlyStipend", "maxDataBudget", "maxFamilySize"]

        for (const filter of Object.keys(filters)){            
            if(separateFiltersExact.includes(filter)){
                const valuesArray = filters[filter].split(",").map(d => parseInt(d.trim()))
                studentData = studentData.filter(student => {
                    const dbMatricNo = parseInt(student[filter])
                    return valuesArray.includes(dbMatricNo)
                })

            } else if (separateFiltersLessThan.includes(filter)){
                studentData = studentData.filter(student => {
                    const editedFilter = filter.charAt(3).toLowerCase() + filter.substring(4)
                    const dbMatricNo = parseInt(student[editedFilter])
                    const normalizedInput = parseInt(filters[filter])
                })
                
            } else if (separateFiltersGreaterThan.includes(filter)){
                studentData = studentData.filter(student => {
                    const editedFilter = filter.charAt(3).toLowerCase() + filter.substring(4)
                    const dbMatricNo = parseInt(student[editedFilter])
                    const normalizedInput = parseInt(filters[filter])
                    return dbMatricNo >= normalizedInput
                })
            } else {
                studentData = studentData.filter((student, index) => {
                    const valuesArray = filters[filter].split(',').map(d => d.trim());
                    const dbMatricNo = student[filter].toString().toLowerCase().trim().normalize('NFC')

                    let success = false

                    for (let value of valuesArray){
                        if(dbMatricNo.includes(value.toString().toLowerCase().trim().normalize('NFC'))){
                            success = true
                            break
                        }
                    }
                    return success
                })
            }
        }

        res.json(studentData)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to read student data' })
    }

}