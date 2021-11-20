import axios from 'axios';
import { url } from '../assets/env';

export function headerToken(Token) {
    axios.interceptors.request.use(
        config => {
            config.headers = { 'token': Token };
            return config;
        }
    );
}

export async function GetUser(Token, id) {
    headerToken(Token);
    return await axios.get(`${url}UserGet/${id}`)
        .then(response => {
            console.log(response.data);
            const user = response.data;
            return user;
        })
}