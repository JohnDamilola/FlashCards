import axios, { AxiosInstance } from 'axios'

const accessToken = window.localStorage.getItem('accessToken')

// const baseURL = 'https://keepevery-backend.herokuapp.com/'
const baseURL = 'http://localhost:8000'

const http: AxiosInstance = axios.create({
  baseURL,
  // headers: { Authorization: `Bearer ${accessToken}` },
})

http.defaults.headers.post['Content-Type'] = 'application/json'

export default http