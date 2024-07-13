import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable() {

  let [rows, setRows] = useState([])

  useEffect( () => {

      (async ()=> {
        let API_KEY = "8c25eda5e58cb2de1fc6b5a4f5563caa"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        let savedTextXML = await response.text();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        let data = new Array()
        let time = xml.getElementsByTagName('time');

        for (let i = 0; i < 10; i++) {
          let day = time[i].getAttribute("from").split("T")[0]
          let range_time = time[i].getAttribute("from").split('T')[1] + ' - ' + time[i].getAttribute("to").split('T')[1]

          let precipitation = time[i].getElementsByTagName("precipitation")[0]
          let precipitationVal = precipitation.getAttribute("probability")

          let windDirection = time[i].getElementsByTagName("windDirection")[0]
          let windDirectionVal = windDirection.getAttribute("deg")+"º"

          let temperatura = time[i].getElementsByTagName("temperature")[0]  
          let temperaturaVal = parseFloat((parseFloat(temperatura.getAttribute("value")) - 273.15).toFixed(2))+"°C"

          let feel_like = time[i].getElementsByTagName("feels_like")[0]  
          let feel_likeVal = parseFloat((parseFloat(feel_like.getAttribute("value")) - 273.15).toFixed(2))+"°C"

          let humidity = time[i].getElementsByTagName("humidity")[0]
          let humidityVal = humidity.getAttribute("value")+"%"

          data.push({ day, range_time, precipitationVal ,windDirectionVal, temperaturaVal, feel_likeVal, humidityVal})
        }
        setRows(data);
      })()

  }, [] )


  {/* JSX */}
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Día</TableCell>
            <TableCell>Rango de tiempo</TableCell>
            <TableCell align="center">Precipitación</TableCell>
            <TableCell align="center">Dirección del Viento</TableCell>
            <TableCell align="center">Temperatura</TableCell>
            <TableCell align="center">Sensacion termica</TableCell>
            <TableCell align="center">Humedad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.day}</TableCell>
              <TableCell component="th" scope="row">{row.range_time}</TableCell>
              <TableCell align="right">{row.precipitationVal}</TableCell>
              <TableCell align="right">{row.windDirectionVal}</TableCell>
              <TableCell align="right">{row.temperaturaVal}</TableCell>
              <TableCell align="right">{row.feel_likeVal}</TableCell>
              <TableCell align="right">{row.humidityVal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}