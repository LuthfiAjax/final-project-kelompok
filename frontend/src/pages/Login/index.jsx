import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    InputGroup,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/service/Auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()

    const [, setCookie] = useCookies()

    return (
        <Container
            maxW="lg"
            py={{ base: '12', md: '24' }}
            px={{ base: '0', sm: '8' }}
        >
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>
                            Log in to your account
                        </Heading>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                onClick={() => {
                                    // logic sign in api
                                    setDisabled(true)
                                    login(
                                        email,
                                        password,
                                        setCookie,
                                        setDisabled,
                                        navigate
                                    )
                                }}
                                disabled={disabled}
                                colorScheme={disabled ? `gray` : `teal`}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Login
