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

const update = (person) => {
    console.log(`Id of person to update: ${person.id}`)
    return axios.put(baseUrl + '/' + person.id, person)
        .then(response => response.data)
        .catch(error => console.log(`Something went wrong with updating person with id: ${person.id}`, error))
}

export default { getAll, create, deletePerson, update }