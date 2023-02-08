import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/ce723e924c1a4017b22718ac82ce2bbb/',
    timeout :10000
})