import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { RegisterModal } from "../../Global/Components/RegisterModal/RegisterModal"

import { useAuthStore } from "../../Global/hooks/useAuthStore"
import { useNavigate } from "react-router-dom"
export const Login = () => {

    const { startLogin } = useAuthStore()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await startLogin(email, password)
        if (res) {
            setEmail('')
            setPassword('')
            navigate('/')
        }
        setLoading(false)
    }

    return (
        <>
            <Box height={'85vh'} display={'flex'} flexDirection={'column'}
                alignItems={'center'} justifyContent={'center'}>

                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <Typography variant="body2" gutterBottom>
                        ¿No tienes cuenta? {
                            !loading && <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setOpen(true)}>
                                Registrate
                            </span>
                        }
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2, width: '100%' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
            <RegisterModal open={open} handleClose={setOpen} />
        </>
    )
}
