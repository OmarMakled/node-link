import axios from 'axios';

const client = axios.create();
const API = 'https://node-link.firebaseio.com';

client.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})
client.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

export default {
    get() {
        return client.get(`${API}/nodes.json`);
    },
    add(data) {
        return client.post(`${API}/nodes.json`, data)
    },
    update(id, data) {
        return client.post(`${API}/nodes/${id}.json`, data)
    },
    delete(id) {
        return client.delete(`${API}/nodes/${id}.json`);
    }
}