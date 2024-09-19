import { Box, Divider, Grid2, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { HotelCard } from "../../Global/Components/HotelCard/HotelCard"

export const Home = () => {

    const [search, setSearch] = useState('')
    const [hoteles, setHoteles] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleHotels = async () => {

        const hoteles = await fetch(`http://127.0.0.1:3000/api/hotel/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await hoteles.json()
        setHoteles(data)
        console.log(data)

    }

    useEffect(() => {
        handleHotels()
    }, [])

    return (
        <Box minHeight={'100vh'}>
            <Typography variant="h1" sx={{fontSize: {xs: '4rem', md: '8rem'}}}> Reservalo! </Typography>
            <Typography variant="h6" fontWeight={100} fontSize={{xs: '.8rem', md: '2.2rem'}} letterSpacing={{xs: '.6rem', sm: '.9rem'}}> A LINKTIC PROJECT </Typography>
            <Divider />

            <Box mt={5}>
                <TextField fullWidth variant="outlined" label="¿A dónde quieres ir?" sx={{ borderRadius: '10px' }} onChange={handleSearch} />
            </Box>

            <Grid2 container spacing={5} mt={5}>
                {
                    hoteles.map(hotel => (
                        <Grid2 size={{xs: 12, md: 6}} item key={hotel._id}>
                            <HotelCard hotel={hotel} />
                        </Grid2>
                    ))
                }
            </Grid2>

        </Box>
    )
}
