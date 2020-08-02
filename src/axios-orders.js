import axios from 'axios'; 

const instance = axios.create({
    baseURL: 'https://react-burger-app-90f8e.firebaseio.com/'
})

export default instance;