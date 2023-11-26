import { Flex, Spinner, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import AppointmentCard from '../components/AppointmentCard'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getAppointment } from '../api/service/Appointment'

const Home = () => {
    const [appointments, setAppointments] = useState([])

    const [cookie] = useCookies()
    const access_token = cookie['access_token']

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // bakal call => localhost:8000/appointment
        setTimeout(() => {
            getAppointment(
                (res) => {
                    const {
                        data: { data },
                    } = res
                    setAppointments([...data])
                },
                (err) => console.error(err),
                () => setLoading(false)
            )
        }, 5000)
    }, [access_token])

    return (
        <Navbar>
            {loading ? (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            ) : (
                <Flex minWidth="max-content" alignItems="center" gap="5">
                    {cookie['access_token'] ? (
                        appointments.map((data, i) => (
                            <AppointmentCard
                                key={i}
                                customer={data.customer}
                                doctorName={data.doctor}
                                appointmentTime={data.appointmentTime}
                                service={data.service}
                            />
                        ))
                    ) : (
                        <Text>Please Login First</Text>
                    )}
                </Flex>
            )}
        </Navbar>
    )
}

export default Home
