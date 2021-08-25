import axios from "axios";
import router from "@/router"

const baseDomain = process.env.VUE_APP_API_ENDPOINT
const baseURL = `${baseDomain}/v1`

const instance = axios.create({
  baseURL
})

// set auth token if present
const token = localStorage.getItem('authToken')


if(token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

instance.defaults.headers.common["Access-Control-Allow-Origin"] = '*'

instance.interceptors.response.use(
  function(res) {
    return res
  },
  function(err) {

    if(err.response.status === 401) return Promise.reject(err)

    localStorage.removeItem('authToken')
    router.push('/login')

  }
)

export default instance