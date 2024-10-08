import { Route, Routes } from 'react-router-dom'

import { Home } from '../Pages/Home/Home'
import { NavBar } from '../Global/Components/NavBar/NavBar'
import { Box, Paper } from '@mui/material'
import { Hotel } from '../Pages/Hotel/Hotel'
import { Reservations } from '../Pages/Reservations/Reservations'
import { Login } from '../Pages/Login/Login'
import { useContext } from 'react'
import { UserContext } from '../Global/Context/UserContext'

export const AppRouter = () => {

    const { user } = useContext(UserContext)

    return (
        <>
            <NavBar />
            <Box component={Paper} elevation={6} mt={8} maxWidth={1000} mx={'auto'} p={5}>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/hotel/:id" element={<Hotel />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>404</h1>} />
                    {
                        user && (
                            <Route path="/reservaciones" element={<Reservations />} />
                        )
                    }
                </Routes>
            </Box>
        </>
    )
}
