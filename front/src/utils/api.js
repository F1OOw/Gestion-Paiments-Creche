import axios from 'axios';

export const deleteToken = ()=>{   
    localStorage.removeItem('token');
    window.location.href="/"
}

export const api = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers:{
        'Content-Type': 'application/json',
    }
});
