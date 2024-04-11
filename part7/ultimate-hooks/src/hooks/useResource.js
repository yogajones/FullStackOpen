import { useState, useEffect } from 'react'
import axios from 'axios'

let token = null

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl)
            setResources(response.data)
        }
        getAll()
    }, [baseUrl])

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, newObject, config)
        setResources(resources.concat(response.data))
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

export default useResource