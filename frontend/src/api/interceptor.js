const onRequest = (config) => {
    console.log(`[axios][onRequest]: ${JSON.stringify(config)}`)
    config.headers.Authorization = getCookie("access_token")
    return config
}

 const getCookie = (cookie_name) => {
    const cookies = document.cookie.split(";");
    const cookies_length = cookies.length;
  
    for (let i = 0; i < cookies_length; i++) {
      const current_cookie = cookies[i].split("=");
      if (current_cookie[0].replace(" ", "") === cookie_name)
        return current_cookie[1];
    }
}

const onRequestError = (err) => {
    console.error(`[axios][onRequestError] err=${err}`)
    return Promise.reject(err)
}

const onResponse = (res) => {
    console.log(`[axios][onResponse]: ${JSON.stringify(res)}`)
    return res
}

const onResponseError = (err) => {
    return Promise.reject(err)
}

export const setupInterceptor = (instance) => {
    instance.interceptors.request.use(onRequest, onRequestError)
    instance.interceptors.response.use(onResponse, onResponseError)
    return instance
}