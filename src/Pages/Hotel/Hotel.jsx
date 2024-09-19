import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Hotel = () => {

    const params = useParams()
    const [hotel, setHotel] = React.useState(null)

    useEffect(() => {
        
    }, [])

    return (
        <Box minHeight={'100vh'}>

            <h1>Hotel {params.id}</h1>

        </Box>
    )
}
