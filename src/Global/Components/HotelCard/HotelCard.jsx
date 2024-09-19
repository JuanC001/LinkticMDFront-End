/* eslint-disable react/prop-types */
import { Box, Paper, Rating, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export const HotelCard = ({ hotel, isReservation = false }) => {

    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate(`/hotel/${hotel._id}`)
    }

    return (
        <Paper onClick={handleNavigation} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px 0px rgba(255,100,0,0.3)' }}
            sx={{ overflow: 'hidden', borderRadius: '15px', cursor: 'pointer' }}>
            <Box width={'100%'} height={'40vh'}>
                <Box component={'img'} src={hotel.image} width={'100%'} height={'60%'} sx={{ objectFit: 'cover' }} />

                <Box height={'40%'} px={2}>

                    <Rating value={hotel.rating} readOnly />
                    <Typography variant="h6"> {hotel.name} </Typography>
                    <Typography variant="caption"> {hotel.address} </Typography>

                    <Typography variant="body2" fontStyle={'italic'}> &quot;{hotel.description}&quot; </Typography>

                </Box>
            </Box>
        </Paper>
    )
}
