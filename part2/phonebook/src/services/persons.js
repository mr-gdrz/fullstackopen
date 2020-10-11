import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

//insert person obj in phonebook db
const create = (newObj) => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, modifiedObj) => {
    const request = axios.put(`${baseUrl}/${id}`, modifiedObj)
    return request.then(response => response.data)
}

export default { create, getAll, deletePerson, updatePerson }