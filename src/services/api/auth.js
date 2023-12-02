import axios from 'axios'

export default {
    userSignIn: (payload) => axios.post('http://localhost:3001/login',payload),
    userRegister: (payload) => axios.post('http://localhost:3001/register',payload),
    getUserData: (email) => axios.get('http://localhost:3001/users?email='+email),
}