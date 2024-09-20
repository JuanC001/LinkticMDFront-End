import { Box, Button, CircularProgress, Divider, Grid2, Rating, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReservationModal } from '../../Global/Components/ReservationModal/ReservationModal'

export const Hotel = () => {

    const params = useParams()
    const [hotel, setHotel] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchHotel = async () => {
        const response = await fetch(`http://localhost:3000/api/hotel/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setHotel(data)
    }

    useEffect(() => {
        fetchHotel()
    }, [])

    const handleToggle = () => {
        setModalOpen(!modalOpen)
    }

    if (!hotel) return <Box height={'90vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <CircularProgress size={100} />
    </Box>

    return (
        <>

            <Box minHeight={'90vh'}>

                <Stack gap={2}>
                    <Typography variant={'h3'}> {hotel?.name} </Typography>
                    <Grid2 container>
                        <Grid2 size={{ xs: 6 }} display={'flex'} alignItems={'center'}>
                            <Rating value={hotel.rating} readOnly />
                        </Grid2>

                        <Grid2 size={{ xs: 6 }} display={'flex'} alignItems={'center'} justifyContent={'end'}>
                            <Typography variant='body2' >
                                {
                                    new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: 'COP'
                                    }).format(hotel?.price)
                                }/Noche
                            </Typography>
                        </Grid2>

                    </Grid2>
                    <Typography variant={'body1'}> {hotel?.address} </Typography>
                    <Divider />

                    <Box component={'img'} src={hotel?.image} width={'100%'} height={'500px'} sx={{ objectFit: 'cover', mx: 'auto' }} />
                    <Typography variant={'body1'}> {hotel?.description} </Typography>
                </Stack>

                <Box height={'10vh'} display={'flex'}>
                    <Button sx={{ alignSelf: 'flex-end' }} variant={'contained'} onClick={handleToggle} fullWidth> Reservar </Button>
                </Box>

            </Box>

            <ReservationModal open={modalOpen} handleToggle={handleToggle} />

        </>
    )
}
