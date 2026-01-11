export function filterData(data, parameters, legalFilters){
    let filteredData = data

    let legalFiltersLowerCase = []

    for (const param of legalFilters){
        legalFiltersLowerCase.push(param.toLowerCase())
    }

    if (!parameters || Object.keys(parameters).length === 0) return filteredData

    for (const [rawKey, rawValue] of Object.entries(parameters)){
        const normalizedKey = (rawKey || '').toString().toLowerCase().trim().normalize('NFC')

        const headerMatch = (legalFilters || []).find(h => {
            return (h || '').toString().toLowerCase().trim().normalize('NFC') === normalizedKey
        })

        if (!headerMatch) continue

        const matchValue = (rawValue ?? '').toString().trim().normalize('NFC').toLowerCase()

        filteredData = filteredData.filter(row => {
            const cell = row[headerMatch]
            const cellValue = (cell ?? '').toString().trim().normalize('NFC').toLowerCase()
            return cellValue === matchValue
        })
    }

    return filteredData
}