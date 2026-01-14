export function verifyQueryParams({matricNo, age, gender, state, residence, utmeScore, modeOfEntry, putmeScore, familySize, monthlyStipend} = {}, res){

    const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Abuja"
    ];
    const titleCaseState = typeof state === "string"
        ? state.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
        : state;

    // Ensure `res` is provided when the caller expects the validator to send responses
    if (!res || typeof res.status !== 'function'){
        throw new Error('verifyQueryParams requires an Express `res` object as second argument')
    }

    // Check numeric fields: allow numeric strings or numbers
    const numericFields = { matricNo, age, utmeScore, putmeScore, familySize, monthlyStipend }
    for (const [key, val] of Object.entries(numericFields)){
        if (val == null || val === '') continue
        if (typeof val === 'number') continue
        if (Number.isNaN(Number(val))){
            return res.status(500).json({ error: 'All numeric fields must be numbers' })
        }
    }

    const matricNum = matricNo == null || matricNo === '' ? undefined : Number(matricNo)
    if (matricNum != null){
        if (matricNum < 100000 || matricNum > 999999){
            return res.status(500).json({ error: 'Invalid Matric No' })
        }
    }

    const ageNum = age == null || age === '' ? undefined : Number(age)
    if (ageNum != null && (ageNum < 16 || ageNum > 80)){
        return res.status(500).json({ error: 'Age is out of university age bound' })
    }

    if (residence && !["On Campus", "Off Campus"].includes(residence)){
        return res.status(500).json({ error: "Residence should return 'Off Campus' or 'On Campus'" })
    }

    if (modeOfEntry && !["UTME", "PUTME", "DE"].includes(modeOfEntry)){
        return res.status(500).json({ error: 'Invalid mode of entry' })
    }

    const utmeNum = utmeScore == null || utmeScore === '' ? undefined : Number(utmeScore)
    if (utmeNum != null && (utmeNum < 200 || utmeNum > 400)){
        return res.status(500).json({ error: 'UTME Score is out of bounds' })
    }

    const putmeNum = putmeScore == null || putmeScore === '' ? undefined : Number(putmeScore)
    if (putmeNum != null && (putmeNum < 50 || putmeNum > 100)){
        return res.status(500).json({ error: 'PUTME Score is out of bounds' })
    }

    if (familySize != null && familySize !== '' && Number(familySize) < 1){
        return res.status(500).json({ error: 'Invalid family size' })
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)){
        return res.status(500).json({ error: 'Invalid gender value' })
    }

    if (state && !nigerianStates.includes(titleCaseState)){
        return res.status(500).json({ error: 'Invalid Nigerian state' })
    }

    return null
}