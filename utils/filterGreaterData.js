export function filterGreaterData(data, parameters){
    let filteredData = data

    let legalFiltersLowerCase = ["age", "utme score", "putme score", "utme writes", "no of olevel sittings", "family size", "monthly stipend", "weekly data spending"]

    // If no parameters provided, return original data
    if (!parameters || Object.keys(parameters).length === 0) return filteredData

    // Iterate through each parameter and apply filters (combined with AND)
    for (const [rawKey, rawValue] of Object.entries(parameters)){
        const normalizedKey = (rawKey || '').toString().toLowerCase().trim().normalize('NFC')

        // Find the matching header from legalFilters (case-insensitive, normalized)
        const headerMatch = (legalFiltersLowerCase || []).find(h => {
            return (h || '').toString().toLowerCase().trim().normalize('NFC') === normalizedKey
        })

        // If this query key is not a legal filter, skip it
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