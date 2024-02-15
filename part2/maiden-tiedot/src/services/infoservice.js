import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
        .catch(error => console.log("Failed to fetch country data from server.", error))
}

export default { getAll }