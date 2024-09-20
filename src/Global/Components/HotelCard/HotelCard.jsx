/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Box, Button, Grid2, IconButton, Paper, Rating, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import linkticApi from '../../../api/linkticApi';
import { ReservationModal } from '../ReservationModal/ReservationModal';
import { UserContext } from '../../Context/UserContext';
import Swal from 'sweetalert2';

export const HotelCard = ({ hotel: info, isReservation = false }) => {

    const navigate = useNavigate()

    const handleClick = () => {

        if (!isReservation) {
            handleNavigation()
            return
        }

    }

    const handleNavigation = () => {
        navigate(`/hotel/${info._id}`)
    }

    return (
        <>
            <Paper onClick={handleClick} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px 0px rgba(255,100,0,0.3)' }}
                sx={{ overflow: 'hidden', borderRadius: '15px', cursor: 'pointer' }}>
                <Box width={'100%'} height={'40vh'}>
                    <Box component={'img'} src={isReservation ? info.hotelImage : info.image} width={'100%'} height={'60%'} sx={{ objectFit: 'cover' }} />

                    <Box height={'40%'} px={2}>

                        {isReservation ? <ReservationCard {...info} /> : <HotelCardComponent {...info} />}

                    </Box>
                </Box>
            </Paper>

        </>
    )
}

const HotelCardComponent = (info) => (
    <>
        <Rating value={info.rating} readOnly />
        <Typography variant="h6"> {info.name} </Typography>
        <Typography variant="caption"> {info.address} </Typography>

        <Typography variant="body2" fontStyle={'italic'}> &quot;{info.description}&quot; </Typography>
    </>
)

const ReservationCard = (info) => {

    const [open, setOpen] = useState(false)
    const { user } = useContext(UserContext)
    const handleDelete = async () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await linkticApi.delete(`/user/reservation/${info._id}`, {
                    data: {
                        uid: user.uid
                    }
                })
                window.location.reload()
            }
        })
    }
    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <Rating value={info.hotelRating} readOnly />
            <Typography variant="h6"> {info.hotelName} </Typography>
            <Grid2 container>
                <Grid2 size={{ xs: 6 }}>
                    <Typography variant="caption"> {info.date_start} - {info.date_end} </Typography>
                    <Typography variant="body1">Personas:  {info.persons} </Typography>
                    <Typography variant="body2"> Total ${parseInt(info.persons) * parseInt(info.hotelPrice)} </Typography>
                </Grid2>
                <Grid2 size={{ xs: 6 }} display={'flex'} flexDirection={'row'} gap={2} justifyContent={'center'} alignItems={'center'}>
                    <IconButton variant={'contained'} color={'primary'} fullWidth onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                    <IconButton variant={'contained'} color={'error'} fullWidth onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Grid2>
            </Grid2>
            <ReservationModal open={open} handleToggle={handleOpen} hotelId={info._id} info={info} editMode={true} />
        </>
    )
}