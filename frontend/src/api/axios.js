import axios from "axios";
import { setupInterceptor } from "./interceptor";

let instance = axios.create({
    baseURL: 'http://localhost:8000'
})

instance = setupInterceptor(instance)

export default instance