import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react"

import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const NavBar = () => {
    const [logged, setLogged] = useState(false)
    const navigation = useNavigate()

    const handleNavigation = (path) => {
        navigation(path)
    }

    return (
        <AppBar>
            <Container>
                <Toolbar>
                    <Box sx={{ cursor: 'pointer' }} flexGrow={1} onClick={() => handleNavigation('/')}>
                        <Typography variant="h6">
                            Reservalo!
                        </Typography>
                        <Typography variant="subtitle2">
                            a linktic project
                        </Typography>
                    </Box>

                    {
                        logged ?
                            <>
                                <MenuItem onClick={() => handleNavigation('/reservaciones')} sx={{ display: 'flex', gap: '5px' }}>
                                    <CalendarMonthIcon />
                                    Mis Reservaciones
                                </MenuItem>
                                <MenuItem sx={{ display: 'flex', gap: '5px' }}>
                                    <LogoutIcon />
                                    Cerrar sesión
                                </MenuItem>

                            </>
                            :
                            <MenuItem onClick={() => handleNavigation('/login')} sx={{ display: 'flex', gap: '5px' }}>
                                <LoginIcon />
                                Inicia sesión
                            </MenuItem>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    )
}
