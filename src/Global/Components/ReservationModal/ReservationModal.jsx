/* eslint-disable react/prop-types */
import { Button, Divider, Grid2, IconButton, Modal, Paper, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';

import { UserContext } from '../../Context/UserContext';
import linkticApi from '../../../api/linkticApi';
import Swal from 'sweetalert2';

export const ReservationModal = ({ hotelId, open = false, handleToggle, info, editMode }) => {

    const { user } = useContext(UserContext)

    const [arriveDate, setarriveDate] = useState('')
    const [leaveDate, setleaveDate] = useState('')
    const [persons, setPersons] = useState(2)

    const handleReservation = async () => {

        if (arriveDate === '' || leaveDate === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacios',
                text: 'Por favor llena todos los campos'
            })
            return
        }

        if (arriveDate > leaveDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Fechas incorrectas',
                text: 'La fecha de llegada no puede ser mayor a la de salida'
            })
            return
        }

        if (persons <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Personas incorrectas',
                text: 'Debes ingresar al menos una persona'
            })
            return
        }

        if (editMode) {
            try {

                await linkticApi.put(`/user/reservation/${info.id}`, {
                    date_start: arriveDate,
                    date_end: leaveDate,
                    persons,
                    uid: user.uid,
                    hotelId: hotelId
                })
                window.location.reload()
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva exitosa',
                    text: 'Tu reserva ha sido exitosa'
                })
                handleToggle()

            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error al reservar'
                })
                handleToggle()

            }
            return
        }

        try {

            await linkticApi.post('/user/reservation', {
                date_start: arriveDate,
                date_end: leaveDate,
                persons,
                uid: user.uid,
                hotelId: hotelId
            })

            Swal.fire({
                icon: 'success',
                title: 'Reserva exitosa',
                text: 'Tu reserva ha sido exitosa'
            })
            handleToggle()

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al reservar'
            })
            handleToggle()

        }

    }

    return (
        <Modal open={open} onClose={handleToggle} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', zIndex: 1000 }}>
            <Paper sx={{ width: '50vw', height: '45vh', padding: 3, position: 'relative' }}>
                <IconButton onClick={handleToggle} sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant={'h4'}> {editMode ? 'Editando Reserva' : 'Reservar'} </Typography>
                <Divider />
                <Grid2 container width={'100%'} spacing={2} mt={3}>
                    {editMode && <Grid2 size={{ xs: 12 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        Fecha Anterior: {info.date_start} - {info.date_end}
                    </Grid2>}
                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuando llegarás aquí? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField value={arriveDate} onChange={(e) => setarriveDate(e.target.value)} required type='date' fullWidth />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuando te irás? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField value={leaveDate} onChange={(e) => setleaveDate(e.target.value)} required type='date' fullWidth />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuantas personas van? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField value={persons} onChange={(e) => setPersons(e.target.value)} required type='number' defaultValue={2} fullWidth />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button fullWidth onClick={handleReservation} variant={'contained'}> {editMode ? 'Actualizar' : 'Reservar'} </Button>
                    </Grid2>

                </Grid2>

            </Paper>
        </Modal>
    )
}
