import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(baseUrl + '/' + id)
        .then(console.log(`Succesfully deleted person with id: ${id}`))
        .catch(error => console.log(`Failed to delete person with id: ${id}`, error))
}

export default { getAll, create, deletePerson }