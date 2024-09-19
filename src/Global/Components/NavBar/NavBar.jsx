import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react"

import { useNavigate } from 'react-router-dom'

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
                    <Box sx={{cursor: 'pointer'}} flexGrow={1} onClick={() => console.log('click')}>
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
                                <MenuItem onClick={() => handleNavigation('/reservaciones')}>
                                    Mis Reservaciones
                                </MenuItem>
                                <MenuItem>
                                    Cerrar sesión
                                </MenuItem>

                            </>
                            :
                            <MenuItem onClick={() => setLogged(true)}>
                                Inicia sesión
                            </MenuItem>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    )
}
