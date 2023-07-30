import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'
import { setCars } from '../../actions';

import { api } from "../../services/api";

import { Box, Typography } from '@mui/material';
import { CarCard } from "../../components/Card";

import { Car } from '../../types';

export function CarList() {
    const dispatch = useDispatch();
    const { cars } = useSelector((state: RootState) => state)
    
    useEffect(() => {

        async function getCars() {
            const response = await api.get("/cars");

            dispatch(setCars(response.data.cars));
        }
        getCars();
    }, []);


    return(
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant='h2' marginTop='32px' marginBottom='32px'>
                Lista de Carros
            </Typography>
            {cars.map((item: Car) => <CarCard  
                id={item.id}
                ano={item.ano}
                desc={item.desc}
                img={item.img}
                preco={item.preco}
                km={item.km}
                local={item.local}
                nome={item.nome}
            />)}  
        </Box>
    );
}