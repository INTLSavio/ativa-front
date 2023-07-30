import { ChangeEvent, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { 
    resetState,
    setAvailability, 
    setCar, 
    setEmail, 
    setHourSelected, 
    setLoading, 
    setName, 
    setOpenErrorToast, 
    setPhone, 
    setSelectedDay,
    setToastMessage
} from '../../actions';

import { api } from '../../services/api';
import { getDay } from 'date-fns';

import { 
    Alert, 
    Box, 
    Button, 
    Card, 
    CardActionArea, 
    CardMedia, 
    CardContent, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    Snackbar, 
    TextField, 
    Typography 
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { BoxInputs } from './styles';

import { AvailabilityItem } from '../../types';

export function CarAppointment() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams()

    const today = new Date();

    const { 
        name, 
        email, 
        phone, 
        availability, 
        car, 
        hourSelected, 
        loading, 
        openErrorToast, 
        selectedDay, 
        toastMessage 
    } = useSelector((state: RootState) => state);

    useEffect(() => {
        async function getCar() {

            const response = await api.get(`/cars/${id}`);

            dispatch(setCar(response.data.car));
            dispatch(setLoading(false));
        }
        getCar()
    }, [id, dispatch]);

    useEffect(() => {
        async function getDayAvailability() {
            const response = await api.get('/schedulings/day-availability', {
                params: {
                    year: selectedDay?.getFullYear(),
                    month: selectedDay ? selectedDay?.getMonth() + 1 : '',
                    day: selectedDay?.getDate(),
                    car_id: car?.id
                }
            })

            dispatch(setAvailability(response.data));
        }
        getDayAvailability();
    }, [selectedDay]);

    const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
    
        const maskedValue = value.replace(
          /^(\d{2})(\d{1,5})(\d{0,4}).*/,
          '($1) $2-$3'
        );
    
        dispatch(setPhone(maskedValue));
    }, [dispatch]);

    const handleClose = useCallback(() => {
        dispatch(setOpenErrorToast(false));
    }, [dispatch]);

    const handleCreateScheduling = useCallback(async () => {
        if (getDay(selectedDay) === 0 || getDay(selectedDay) === 6) {

            dispatch(setToastMessage('O dia selecionado não pode ser fim de semana!'));
            dispatch(setOpenErrorToast(true));

        } else if(name === '' || email === '' || phone === '' || !hourSelected) {

            dispatch(setToastMessage('Preencha todos os dados!'))
            dispatch(setOpenErrorToast(true));

        } else if(selectedDay){
            const date = new Date(selectedDay)
    
            if (hourSelected) {
                date.setHours(hourSelected);
                date.setMinutes(0);
            }

            await api.post('/schedulings', {
                carName: car?.nome,
                name: name,
                phone: phone,
                email: email,
                date,
                car_id: car?.id
            })
            
            dispatch(resetState());

            navigate('/sucesso')
        } 
    }, [car?.id, car?.nome, dispatch, email, hourSelected, name, navigate, phone, selectedDay])

    const disableWeekends = useCallback((date: Date) => {
        return date.getDay() === 0 || date.getDay() === 6;
    }, []);

    if (loading) {
        return (
            <h1>Carregando</h1>
        );
    }

    if (car) {
        return(
            <Box 
                display='flex' 
                flexDirection='column' 
                justifyContent="space-between" 
                alignItems="center" 
                height='100vh' 
                gap='14px'
            >
                <Typography variant='h2' marginTop='32px'>
                    Agendamento
                </Typography>
                <Box display='flex' justifyContent="center" alignItems="center" height='100vh' gap='14px'>
                    <Card sx={{ width: 350, height: 360 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={car.img}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {car.nome}
                                </Typography>
                                <Typography variant="body2">
                                    {car.desc}    
                                </Typography>
                                <Typography variant="body2" fontWeight='bold' marginTop='12px'>
                                    R$ {car.preco}    
                                </Typography>
                                <Typography variant="body2">
                                    Local: {car.local}    
                                </Typography>
                            </CardContent>
                            <Button 
                                variant='contained' 
                                sx={{ marginLeft: '11%', color: '#fff' }} 
                                onClick={() => navigate('/carros')}
                            >
                                Voltar para a lista de carros
                            </Button>
                        </CardActionArea>
                    </Card>
                    <BoxInputs display='flex' flexDirection='column' gap='14px' >
                        <Box display='flex' alignItems='center' justifyContent='center' gap='12px'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>  
                                <DemoContainer components={['DatePicker']} sx={{ width: 'calc(50% - 6px)' }}>
                                    <DatePicker 
                                        shouldDisableDate={disableWeekends}
                                        minDate={today} 
                                        label='Dia'
                                        value={selectedDay}
                                        format='dd/MM/yyyy'
                                        onChange={(newValue) => newValue ? dispatch(setSelectedDay(newValue)) : ''}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormControl sx={{ marginTop: '7px', width: 'calc(50% - 6px)' }}>
                                <InputLabel id='demo-simple-select-label'>Horário</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Horário'
                                    onChange={(e) => dispatch(setHourSelected(Number(e.target.value)))}
                                >
                                    {
                                        availability?.length && availability.map((item: AvailabilityItem) =>   
                                            <MenuItem value={item.hour} disabled={item.availability === false}>
                                                {item.hour}:00
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display='flex' flexDirection='column' gap='12px'>
                            <TextField  
                                sx={{ width: '100%' }} 
                                onChange={(e) => dispatch(setName(e.target.value))} 
                                id="outlined-basic" 
                                label="Nome" 
                                variant="outlined" 
                            />
                            <Box display='flex' gap='12px'>
                                <TextField 
                                    sx={{ width: 'calc(50% - 6px)' }} 
                                    onChange={(e) => dispatch(setEmail(e.target.value))} 
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                />
                                <TextField 
                                    sx={{ width: 'calc(50% - 6px)' }} 
                                    onChange={handlePhoneChange} 
                                    value={phone} 
                                    id="outlined-basic" 
                                    label="Telefone" 
                                    variant="outlined" 
                                />
                            </Box> 
                        </Box>
                        <Button 
                            color='primary' 
                            sx={{ color: '#fff' }} 
                            variant='contained' 
                            onClick={() => handleCreateScheduling()}
                        >
                            Agendar
                        </Button>
                    </BoxInputs>
                    {openErrorToast && 
                        <Snackbar 
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                            open={openErrorToast} 
                            autoHideDuration={3000} 
                            onClose={handleClose} 
                        >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {toastMessage}
                            </Alert>
                        </Snackbar>
                    } 
                </Box>
            </Box>
        );
    }
}