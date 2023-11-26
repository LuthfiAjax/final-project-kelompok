import {
    Card,
    CardHeader,
    CardBody,
    Stack,
    StackDivider,
    Box,
    Text,
    Heading,
} from '@chakra-ui/react'

// destructure props
const AppointmentCard = ({
    customer,
    doctorName,
    appointmentTime,
    service,
}) => {
    return (
        <Card border={`1px solid black`}>
            <CardHeader>
                <Heading size="md">Appointment</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                        <Heading size="xs" textTransform="uppercase">
                            Customer Detail
                        </Heading>
                        <Text pt="2" fontSize="sm">
                            <div>Name: {customer.name}</div>
                            <div>Email: {customer.email}</div>
                        </Text>
                    </Box>
                    <Box>
                        <Heading size="xs" textTransform="uppercase">
                            Doctor's Name
                        </Heading>
                        <Text pt="2" fontSize="sm">
                            {doctorName}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size="xs" textTransform="uppercase">
                            Appointment Detail
                        </Heading>
                        <Text pt="2" fontSize="sm">
                            {`Appointment Time: ${new Date(
                                appointmentTime
                            ).toLocaleDateString()}; Service: ${service}`}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default AppointmentCard
