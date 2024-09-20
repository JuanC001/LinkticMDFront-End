import { Box, Button, CircularProgress, Divider, Grid2, Rating, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReservationModal } from '../../Global/Components/ReservationModal/ReservationModal'
import { UserContext } from '../../Global/Context/UserContext'
import linkticApi from '../../api/linkticApi'
import Swal from 'sweetalert2'

export const Hotel = () => {

    const { user } = useContext(UserContext)
    const params = useParams()
    const [hotel, setHotel] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const fetchHotel = async () => {
        const response = await linkticApi.get(`/hotel/${params.id}`)
        setHotel(response.data)
    }

    useEffect(() => {
        fetchHotel()
    }, [])

    const handleToggle = () => {
        if (!user) return Swal.fire({
            icon: 'warning',
            title: 'Debes iniciar sesion',
            text: 'Para reservar debes iniciar sesion'
        })
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
                    <Box height={'20vh'} sx={{ overflowX: 'scroll' }}>

                        <Stack direction={'row'} gap={2}>

                            {hotel?.reviews.map((review, index) => (
                                <Stack key={index} gap={1} sx={{ width: '300px', p: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
                                    <Typography variant={'body2'}> {review.name} </Typography>
                                    <Rating value={hotel.rating} readOnly />
                                    <Typography variant={'body2'}> {review.message} </Typography>
                                </Stack>
                            ))}
                        </Stack>

                    </Box>
                </Stack>

                <Box height={'10vh'} display={'flex'}>
                    <Button sx={{ alignSelf: 'flex-end' }} variant={'contained'} onClick={handleToggle} fullWidth> Reservar </Button>
                </Box>

            </Box>

            <ReservationModal open={modalOpen} handleToggle={handleToggle} hotelId={params.id} />

        </>
    )
}
