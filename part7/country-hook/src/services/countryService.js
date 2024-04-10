import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${baseUrl}/api/name/${name}`)
        return response.data
    } catch (error) {
        return null
    }
}

export default getCountryByName