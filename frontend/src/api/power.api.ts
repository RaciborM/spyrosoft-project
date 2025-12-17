import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const getPowerMix = async () => {
    const response = await api.get('/api/energy/mix')
    return response.data
}