import axios from 'axios';

export const deleteToken = ()=>{   
    localStorage.removeItem('token');
    window.location.href="/"
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type': 'application/json',
    }
});
