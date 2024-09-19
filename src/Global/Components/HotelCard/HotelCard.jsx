import { Box, Paper, Rating, Typography } from '@mui/material'

export const HotelCard = ({ hotel, isReservation }) => {
    return (
        <Box component={Paper} borderRadius={5} overflow={'hidden'}>
            <Box width={'100%'} height={'40vh'}>
                <Box component={'img'} src={hotel.image} width={'100%'} height={'60%'} sx={{ objectFit: 'cover' }} />

                <Box height={'40%'} px={2}>

                    <Rating value={hotel.rating} readOnly />
                    <Typography variant="h6"> {hotel.name} </Typography>
                    <Typography variant="caption"> {hotel.address} </Typography>

                    <Typography variant="body2" fontStyle={'italic'}> &quot;{hotel.description}&quot; </Typography>

                </Box>
            </Box>
        </Box>
    )
}
