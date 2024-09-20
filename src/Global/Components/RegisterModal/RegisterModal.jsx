import { Alert, Button, Divider, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Swal from 'sweetalert2'

import linkticApi from '../../../api/linkticApi'

export const RegisterModal = ({ open = false, handleClose }) => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [alias, setAlias] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState('')
    const [error, setError] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setError(false)
        if (password !== confirmPassword) {
            setErrors('Las contraseñas no coinciden')
            setError(true)
            return
        }

        if (!name || !lastName || !alias || !email || !password || !confirmPassword) {
            setError(true)
        }

        const data = {
            name,
            lastname: lastName,
            username: alias,
            email,
            password
        }

        try {
            await linkticApi.post('/auth/register', data)
            handleClose(false)
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso!',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            setErrors("Error al registrar, verifica el correo")
            setError(true)
        }
    }

    return (
        <Modal open={open} onClose={() => handleClose(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{ minHeight: '50vh', width: '60vw', padding: 4 }}>
                <Typography variant="h4">Registro</Typography>
                <Divider />
                <form onSubmit={handleRegister}>
                    <Alert severity="error" sx={{ display: error ? 'block' : 'none', mt: 2 }} >{errors}</Alert>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <TextField required onChange={(e) => setName(e.target.value)} label="Nombre" variant="outlined" fullWidth sx={{ mt: 2 }} />
                        <TextField required onChange={(e) => setLastName(e.target.value)} label="Apellido" variant="outlined" fullWidth sx={{ mt: 2 }} />
                    </Stack>
                    <TextField required onChange={(e) => setAlias(e.target.value)} label="Alias" variant="outlined" fullWidth sx={{ mt: 2 }} />
                    <TextField required onChange={(e) => setEmail(e.target.value)} type='email' label="Email" variant="outlined" fullWidth sx={{ mt: 2 }} />
                    <TextField required onChange={(e) => setPassword(e.target.value)} type='password' label="Password" variant="outlined" fullWidth sx={{ mt: 2 }} />
                    <TextField required onChange={(e) => setConfirmPassword(e.target.value)} type='password' label="Confirm Password" variant="outlined" fullWidth sx={{ mt: 2 }} />

                    <Button variant="contained" color="primary" sx={{ mt: 2 }} type='submit' fullWidth>Registrarse</Button>
                </form>
            </Paper>
        </Modal>
    )
}
