import { useNavigate } from 'react-router-dom';

import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Car } from '../../types';

export function CarCard({
    id,
    nome,
    desc,
    img,
    km,
    local,
    ano,
    preco
}: Car) {
    const navigate = useNavigate();

    return(
        <Card 
            sx={{ 
                position: 'relative', display: 'flex', height:'200px', 
                alignItems: 'center', margin: '0 12px', marginBottom: '12px', 
                borderRadius: '4px', maxWidth: '1000px', width: '90%' 
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 300, height: '100%' }}
                image={img}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {nome}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {desc}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Ano: {ano}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Kilometragem: {km}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Local: {local}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Preço: R$ {preco}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                </Box> 
            </Box>
            <Box sx={{ position: 'absolute', right: '12px'}}>
                <Button 
                    variant='contained' 
                    sx={{ color: '#fff' }} 
                    onClick={() => navigate(`/agendar/${id}`)}
                >
                    Agendar Visita
                </Button>
            </Box>
        </Card>
    );
}