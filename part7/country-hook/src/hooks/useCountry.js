import { useState, useEffect } from "react"
import getCountryByName from '../services/countryService'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (name) {
                const response = await getCountryByName(name)
                if (response) {
                    setCountry({ data: response, found: true })
                } else {
                    setCountry({ found: false })
                }
            }
        }

        fetchData()
    }, [name])

    return country
}