import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { RegisterModal } from "../../Global/Components/RegisterModal/RegisterModal"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [open, setOpen] = useState(false)

    const handleRegister = () => { }

    const handleLogin = () => { }

    return (
        <>
            <Box height={'85vh'} display={'flex'} flexDirection={'column'}
                alignItems={'center'} justifyContent={'center'}>

                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '70%' }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '70%' }}
                />
                <Typography variant="body2" gutterBottom>
                    ¿No tienes cuenta? <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setOpen(true)}>
                        Registrate
                    </span>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ mt: 2, width: '70%' }}
                >
                    Login
                </Button>
            </Box>
            <RegisterModal open={open} handleClose={setOpen} />
        </>
    )
}
