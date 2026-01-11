export function filterIfIncluded(data, key, value){
    return (
        data.filter(student => {
            const dbMatricNo = student[key].toString().toLowerCase().trim().normalize('NFC')
            const normalizedInput = value.toString().toLowerCase().trim().normalize('NFC')
            return dbMatricNo.includes(normalizedInput)
        })
)
}