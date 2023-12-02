import axios from 'axios'

export default {
    userSignIn: (payload) => axios.post(`${process.env.BASE_URL}/login`,payload),
    userRegister: (payload) => axios.post(`${process.env.BASE_URL}/register`,payload),
    getUserData: (email) => axios.get(`${process.env.BASE_URL}/users?email=${email}`),
}