import axios from './axios'

export default {
    getApi : (endpoint) => {
        return axios.get(endpoint);
    },
    postApi : (endpoint,payload) => {
        return axios.post(endpoint,payload);
    },
    updateApi: (endpoint,payload) => {
        return axios.put(endpoint,payload);
    },
    deleteApi: (endpoint,slug) => {
        return axios.delete(`${endpoint}/${slug}`);
    }
}