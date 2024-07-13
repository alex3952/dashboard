import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';

import mañana from '../assets/guayaquil mañana.jpg'
import tarde from '../assets/guayaquil tarde.jpg'
import noche from '../assets/guayaquil noche.jpeg'

export default function Summary() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const localTime = new Date(time.getTime());

    const hora_tiempo_real = localTime.toLocaleTimeString([], { hour12: false });
    const dia_tiempo_real = localTime.toLocaleDateString('es-ES', { 
        weekday: 'long'
    });
    const fecha_tiempo_real = localTime.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
    });

    let Parte_del_dia = ""
    let img_dia: any

    if (localTime.getHours() >= 6 && localTime.getHours() < 12){
        Parte_del_dia = dia_tiempo_real + ' por la mañana';
        img_dia = mañana
    } else if (localTime.getHours() >= 12 && localTime.getHours() < 19) {
        Parte_del_dia = dia_tiempo_real + ' por la tarde';
        img_dia = tarde
    }else {
        Parte_del_dia = dia_tiempo_real + ' por la noche';
        img_dia = noche
    }


    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="280"
                    image={img_dia}/>
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {Parte_del_dia}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {hora_tiempo_real}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	{fecha_tiempo_real}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}