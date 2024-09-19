import { Route, Routes } from 'react-router-dom'

import { Home } from '../Pages/Home/Home'
import { NavBar } from '../Global/Components/NavBar/NavBar'
import { Box } from '@mui/material'

export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Box mt={10} maxWidth={1500} mx={'auto'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>
        </>
    )
}
