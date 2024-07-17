import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import './App.css'
import Box from '@mui/material/Box';

function App() {
	{/* Variable de estado y función de actualización */}

	let [indicators, setIndicators] = useState([])
	const [Variable, setVariable] = useState(-1);

    {/* Hook: useEffect */}
		
	useEffect(()=>{

		(async ()=>{
		{/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */}

		let savedTextXML = localStorage.getItem("openWeatherMap")
		let expiringTime = localStorage.getItem("expiringTime")

		{/* Estampa de tiempo actual */}

         let nowTime = (new Date()).getTime();

        {/* Realiza la petición asicrónica cuando: 
            (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
            (2) La estampa de tiempo actual es mayor al tiempo de expiración */}
		
		if(expiringTime === null || nowTime > parseInt(expiringTime)) {

			{/* Request */}

			let API_KEY = "8c25eda5e58cb2de1fc6b5a4f5563caa"
			let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
			savedTextXML = await response.text();
			{/* Diferencia de tiempo */}

			let hours = 1
			let delay = hours * 3600000


			{/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

			localStorage.setItem("openWeatherMap", savedTextXML)
			localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
		}
		{/* XML Parser */}

		const parser = new DOMParser();
		const xml = parser.parseFromString(savedTextXML, "application/xml");

		{/* Arreglo para agregar los resultados */}

		let dataToIndicators = new Array()

		{/* 
			Análisis, extracción y almacenamiento del contenido del XML 
			en el arreglo de resultados
		*/}

		let location = xml.getElementsByTagName("location")[1]

		let geobaseid = location.getAttribute("geobaseid")
		dataToIndicators.push(["Geobaseid","Guayaquil", geobaseid])

		let latitude = location.getAttribute("latitude")
		dataToIndicators.push(["Latitud","Guayaquil", latitude])

		let longitude = location.getAttribute("longitude")
		dataToIndicators.push(["Longitud","Guayaquil", longitude])

		//console.log( dataToIndicators )
		
		{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */}

        let indicatorsElements = Array.from(dataToIndicators).map(
			(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
		)
		   
		{/* Modificación de la variable de estado mediante la función de actualización */}

		setIndicators(indicatorsElements)

		})()
	},[])

	{/* JSX */}
	return (
    <Grid container spacing={5}>
		  <Grid xs={12} sm={12} md={12} lg={12}>
		  	<h1 className="h1" id="titulo">
			    Tiempo y clima en Guayaquil
			</h1>
		  </Grid>
		  <Grid xs={12} sm={12} md={12} lg={12}>
			<h2 className="h2" id="Hoy">
				Fecha y hora
			</h2>
		  </Grid>
	      <Grid xs={12} sm={12} md={12} lg={12}>
		  	<Summary></Summary>
		  </Grid>
		  <Grid xs={12} sm={12} md={12} lg={12}>
			<h2 className="h2" id="Hoy">
				Indicadores del día de hoy
			</h2>
		  </Grid>
	      <Box bgcolor= "lightgray" p={2} borderRadius={2}>
		  	<Grid xs={6} sm={4} md={3} lg={12}>
		  		{indicators[0]}
		  	</Grid>
		  </Box>
	      <Grid xs={6} sm={4} md={3} lg={4}>
		  	{indicators[1]}
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={4}>
		  	{indicators[2]}
		  </Grid>
		  <Grid xs={12} sm={12} md={12} lg={12}>
			<h2 className="h2" id="pronostico">
				Tabla de pronosticos
			</h2>
		  </Grid>
	      <Grid xs={12} sm={12} md={12} lg={12}>
		  	<BasicTable></BasicTable>
		  </Grid>
		  <Grid xs={12} sm={12} md={12} lg={12}>
			<h2 className="h2" id="pronostico">
				Grafico
			</h2>
		  </Grid>
		  <Grid xs={12} lg={2}>
		  	<ControlPanel setVariable={setVariable} />
         </Grid>
		  <Grid xs={12} lg={10}>
		  	<WeatherChart Valor_seleccionado={Variable} />
         </Grid>
	</Grid>
	
  )
}

export default App
