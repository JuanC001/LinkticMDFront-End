import { Box, Divider, Grid2, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { HotelCard } from "../../Global/Components/HotelCard/HotelCard"
import LinkTicApi from "../../api/linkticApi.js";
import SearchIcon from '@mui/icons-material/Search';

export const Home = () => {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [hoteles, setHoteles] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        handleHotels()
    }, [])

    const handleHotels = async () => {

        const response = await LinkTicApi.get('/hotel')
        setHoteles(response.data)
        setLoading(false)

    }

    const filterHotels = () => {
        return hoteles.filter(hotel => hotel.name.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <Box minHeight={'100vh'}>
            <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '8rem' } }}> Reservalo! </Typography>
            <Typography variant="h6" fontWeight={100} fontSize={{ xs: '.8rem', md: '2.2rem' }} letterSpacing={{ xs: '.6rem', sm: '.9rem' }}> A LINKTIC PROJECT </Typography>
            <Divider />

            <Box mt={5}>
                <TextField fullWidth variant="outlined" label="¿A dónde quieres ir?"
                    placeholder="Hotel Estelar La Fontana" sx={{ borderRadius: '10px' }}
                    onChange={handleSearch}
                    slotProps={{
                        input: {
                            endAdornment: <SearchIcon />
                        }
                    }}
                />
            </Box>

            <Grid2 container spacing={5} mt={5}>
                {
                    loading ? <Typography variant="h4">Cargando...</Typography> :
                        filterHotels().map(hotel => (
                            <Grid2 size={{ xs: 12, md: 6 }} key={hotel._id}>
                                <HotelCard hotel={hotel} />
                            </Grid2>
                        ))
                }
            </Grid2>

        </Box>
    )
}
