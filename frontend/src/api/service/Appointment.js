import axios from "../axios"

const getAppointment = (handleRes, handleErr, handleFinally) => {
    axios
    .get('/appointment')
    .then(handleRes)
    .catch(handleErr)
    .finally(handleFinally)
}

export { getAppointment }