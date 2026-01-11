export function filterGreaterData(data, parameters){
    let filteredData = data

    let legalFiltersLowerCase = ["age", "utme score", "putme score", "utme writes", "no of olevel sittings", "family size", "monthly stipend", "weekly data spending"]

    if (!parameters || Object.keys(parameters).length === 0) return filteredData

    for (const [rawKey, rawValue] of Object.entries(parameters)){
        const normalizedKey = (rawKey || '').toString().toLowerCase().trim().normalize('NFC')

        const headerMatch = (legalFiltersLowerCase || []).find(h => {
            return (h || '').toString().toLowerCase().trim().normalize('NFC') === normalizedKey
        })

        if (!headerMatch) continue

        const matchValue = (rawValue ?? '').toString().trim().normalize('NFC').toLowerCase()

        filteredData = filteredData.filter(row => {
            const cell = row[headerMatch]
            const cellValue = (cell ?? '').toString().trim().normalize('NFC').toLowerCase()
            return cellValue >= matchValue
        })
    }

    return filteredData
}