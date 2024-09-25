import axios from 'axios'

export const postRequest = (req) => {
    return new Promise(async (res, rej) => {
        try {
            const data = await axios.post(`http://localhost:8000/api/${req.route}`,req.body, {
                headers: {
                    Authorization: `Bearer ${req.token}`
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

