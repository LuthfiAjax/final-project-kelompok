import axios from '../axios'

export const login = (email, password, setCookie, setDisabled, navigate) => {
    axios
        .post('/login', {
            email: email,
            password: password,
        })
        .then(({ data }) => {
            // store cookie
            setCookie('access_token', data.access_token)
            navigate('/')
        })
        .catch((error) => {
            if (error.response) {
                // Kesalahan respons dari server (misalnya, status kode tidak berhasil)
                console.error('Server Error:', error.response.data)
            } else if (error.request) {
                // Tidak ada respons dari server
                console.error('No Response from Server:', error.request)
            } else {
                // Kesalahan pengaturan permintaan
                console.error('Request Error:', error.message)
            }
        })
        .finally(() => setDisabled(false))
}
