import axios from 'axios'

export const postRequest = (route = '', token = '', body={}) => {
    return new Promise(async (res, rej) => {
        try {
            const data = await axios.post(`http://localhost:8000/api/${route}`,body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            res(data)
        } catch (error) {
            rej(error)
        }
    })
}

export const getRequest = async (route = '', token = '') => {
    return new Promise(async (res, rej) => {
        try {
            const data = await axios.get(`http://localhost:8000/api/${route}`,
                { headers: { "Authorization": `${token}` } })
            res(data)
        } catch (error) {
            rej("Connection Error")
        }
    })
}

