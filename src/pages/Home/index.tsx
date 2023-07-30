import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return(
    <Box 
      height='100vh' 
      display='flex' 
      alignItems='center' 
      justifyContent='center'
      flexDirection='column'
    >
      <Typography variant='h3'>
        Bem vindo à Car Store
      </Typography>
      <img 
        src="https://s2-autoesporte.glbimg.com/I6iS9_8pMnPaODbaJRzHEubp5E0=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/c/z/5U1aPWTOWNATKHJ5hhAw/2015-02-26-vplus-frente.jpg" alt="" 
        style={{
          objectFit: 'cover',
          maxHeight: '500px'
        }}
      />
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='14px'>
        <Typography variant='h5'>Clique no botão abaixo para visualizar os veículos!</Typography>
        <Button variant='contained' sx={{ color: '#fff', margin: '0 auto' }} onClick={() => navigate('/carros')}>Ver veículos</Button>
      </Box>
    </Box>
  );
}