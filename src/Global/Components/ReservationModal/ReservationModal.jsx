/* eslint-disable react/prop-types */
import { Divider, Grid2, IconButton, Modal, Paper, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export const ReservationModal = ({ open = false, handleToggle }) => {
    return (
        <Modal open={open} onClose={handleToggle} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{ width: '50vw', height: '40vh', padding: 3, position: 'relative' }}>
                <IconButton onClick={handleToggle} sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant={'h4'}> Reservar </Typography>
                <Divider />
                <Grid2 container width={'100%'} spacing={2} mt={3}>
                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuando llegarás aquí? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField required type='date' fullWidth />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuando te irás? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField required type='date' fullWidth />
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant={'body1'}> ¿Cuando te personas? </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField required type='number' defaultValue={2} fullWidth />
                    </Grid2>

                </Grid2>

            </Paper>
        </Modal>
    )
}
