import { Route, Routes } from 'react-router-dom'

import { Home } from '../Pages/Home/Home'
import { NavBar } from '../Global/Components/NavBar/NavBar'
import { Box, Paper } from '@mui/material'

export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Box component={Paper} elevation={6} mt={8} maxWidth={1000} mx={'auto'} p={5}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>
        </>
    )
}
