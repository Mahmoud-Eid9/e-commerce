import axios from 'axios'

export const PostRequest = (params) => {
    return new Promise(async (res, rej) => {
        try {
            const data = await axios.post(`http://localhost:8000/api/${params.route}`,params.body, {
                headers: {
                    Authorization: `Bearer ${params.token}`
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
                { headers: { "Authorization": `Bearer ${token}` } })
            console.log(data)
            res(data)
        } catch (error) {
            rej("Connection Error")
        }
    })
}

