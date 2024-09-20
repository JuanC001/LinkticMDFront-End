import { Box, Divider, Grid2, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { UserContext } from '../../Global/Context/UserContext'
import linkticApi from '../../api/linkticApi'
import { HotelCard } from '../../Global/Components/HotelCard/HotelCard'

export const Reservations = () => {

    const { user } = useContext(UserContext)
    const [reservations, setReservations] = useState([])

    const fetchReservations = async () => {
        const res = await linkticApi.get(`/user/reservations/${user.uid}`)
        setReservations(res.data)
    }
    useEffect(() => {
        if (!user) {
            return
        }

        fetchReservations()

    }, [user])

    return (
        <Box minHeight={'100vh'}>
            <Typography variant={'h2'}>Reservations ({reservations.length})</Typography>
            <Divider />
            <Box mt={4}>
                {reservations.length === 0 ? <Typography variant={'h4'}>No reservations</Typography>
                    :
                    <Grid2 container spacing={1}>
                        {reservations.map((reservation, index) => (
                            <Grid2 key={index} size={{ xs: 12, md: 6 }}>

                                <HotelCard hotel={reservation} isReservation={true} />

                            </Grid2>
                        ))}
                    </Grid2>

                }
            </Box>
        </Box>
    )
}
