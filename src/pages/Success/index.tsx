import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import check from '../../assets/check.png'

export function Success() {
    const navigate = useNavigate();

    return(
        <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
            <Card sx={{ width: '80%', maxWidth: 1000}}>
                <CardContent 
                    sx={{ 
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
                    }}
                >
                    <Typography variant="h3" >
                        Agendamento Concluído!
                    </Typography>
                    <img src={check} alt="Check" />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Clique no botão para voltar para a listagem de carros
                    </Typography>
                    <Button 
                        variant='contained' 
                        sx={{ color: '#fff' }} 
                        onClick={() => navigate('/carros')}
                    >
                        Carros
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}