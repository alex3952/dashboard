import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';


const WeatherChart = ({ Valor_seleccionado }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let API_KEY = "8c25eda5e58cb2de1fc6b5a4f5563caa"
			    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
                let savedTextXML = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                let time = xml.getElementsByTagName('time');
                let Datos_precipitacion = [];
                let Datos_direccionViento = [];
                let Datos_temperatura = [];
                let Datos_sensacionTermica = [];
                let Datos_Humedad = [];

                for (let i = 0; i < time.length; i++) {
                    let day = time[i].getAttribute("from")
          
                    let precipitation = time[i].getElementsByTagName("precipitation")[0]
                    let precipitationVal = parseFloat(precipitation.getAttribute("probability"))
                    Datos_precipitacion.push([new Date(day), precipitationVal]);
          
                    let windDirection = time[i].getElementsByTagName("windDirection")[0]
                    let windDirectionVal = parseFloat(windDirection.getAttribute("deg"))
                    Datos_direccionViento.push([new Date(day), windDirectionVal]);
          
                    let temperatura = time[i].getElementsByTagName("temperature")[0]  
                    let temperaturaVal = parseFloat((parseFloat(temperatura.getAttribute("value")) - 273.15).toFixed(2))
                    Datos_temperatura.push([new Date(day), temperaturaVal]);
          
                    let feel_like = time[i].getElementsByTagName("feels_like")[0]  
                    let feel_likeVal = parseFloat((parseFloat(feel_like.getAttribute("value")) - 273.15).toFixed(2))
                    Datos_sensacionTermica.push([new Date(day), feel_likeVal]);
          
                    let humidity = time[i].getElementsByTagName("humidity")[0]
                    let humidityVal = parseFloat(humidity.getAttribute("value"))
                    Datos_Humedad.push([new Date(day), humidityVal]);

                }

                switch (Valor_seleccionado) {
                    case -1:
                        setChartData([['Fecha', 'Precipitación', 'Dirección del viento', 'Temperatura', 'Sensación termica', 'Humedad']
                        ].concat(Datos_precipitacion.map((_, i) => [
                            Datos_precipitacion[i][0],
                            Datos_precipitacion[i] ? Datos_precipitacion[i][1] : null,
                            Datos_direccionViento[i][1],
                            Datos_temperatura[i][1],
                            Datos_sensacionTermica[i][1],
                            Datos_Humedad[i][1]])));
                        break;
                    case 0:
                        setChartData([['Fecha', 'Precipitación']].concat(Datos_precipitacion));
                        break;
                    case 1:
                        setChartData([['Fecha', 'Dirección del viento']].concat(Datos_direccionViento));
                        break;
                    case 2:
                        setChartData([['Fecha', 'Temperatura']].concat(Datos_temperatura));
                        break;
                    case 3:
                        setChartData([['Fecha', 'Sensación termica']].concat(Datos_sensacionTermica));
                        break;
                    case 4:
                        setChartData([['Fecha', 'Humedad']].concat(Datos_Humedad));
                        break;
                    case 5:
                        setChartData([['Fecha', 'Precipitación', 'Dirección del viento', 'Temperatura', 'Sensación termica', 'Humedad']
                        ].concat(Datos_precipitacion.map((_, i) => [
                            Datos_precipitacion[i][0],
                            Datos_precipitacion[i] ? Datos_precipitacion[i][1] : null,
                            Datos_direccionViento[i][1],
                            Datos_temperatura[i][1],
                            Datos_sensacionTermica[i][1],
                            Datos_Humedad[i][1]])));
                        break;
                    default:
                        break;
                }

            } catch (error) {
                console.error('Error al cargar datos del clima:', error);
            }};

            fetchData();
        }, [Valor_seleccionado]);

    {/* Configuración */}

    const options = {
        title: "Grafico de Datos",
        curveType: "function",
        legend: { position: "right" },
        haxis: {
            format: 'dd/MM/yyyy HH:mm',
        },
    }


    {/* JSX */}

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={chartData}
                width="100%"
                height="400px"
                options={options}
        />
        </Paper>
    )
}

export default WeatherChart;