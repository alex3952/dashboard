import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import './App.css'

function App() {
	{/* Variable de estado y función de actualización */}

	let [indicators, setIndicators] = useState([])
	let [rowsTable, setRowsTable] = useState([])

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
		let name = xml.getElementsByTagName("name")[0].innerHTML
		//let namei = name.getAttribute("name")
		dataToIndicators.push(["Ciudad","name", name])

		let geobaseid = location.getAttribute("geobaseid")
		dataToIndicators.push(["Location","geobaseid", geobaseid])

		let latitude = location.getAttribute("latitude")
		dataToIndicators.push(["Location","Latitude", latitude])

		let longitude = location.getAttribute("longitude")
		dataToIndicators.push(["Location","Longitude", longitude])

		//console.log( dataToIndicators )
		
		{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */}

        let indicatorsElements = Array.from(dataToIndicators).map(
			(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
		)
		   
		{/* Modificación de la variable de estado mediante la función de actualización */}

		setIndicators(indicatorsElements)
		 {/* 
             2. Procese los resultados de acuerdo con el diseño anterior.
             Revise la estructura del documento XML para extraer los datos necesarios. 
         */}

         let arrayObjects = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
				
			let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

			let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
			   
			return { "rangeHours": rangeHours,"windDirection": windDirection }
		   
		})

		arrayObjects = arrayObjects.slice(0,8)
	   
		{/* 3. Actualice de la variable de estado mediante la función de actualización */}

		setRowsTable(arrayObjects)

		})()
	},[])

	{/* JSX */}
	return (
    <Grid container spacing={5}>
	      <Grid xs={6} sm={4} md={3} lg={4}>
		  	{indicators[0]}
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={4}>
		  	{indicators[1]}
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={4}>
		  	{indicators[2]}
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={6}>
		  	{indicators[3]}
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={6}>
		  	<BasicTable rows={rowsTable}></BasicTable>
		  </Grid>
		  <Grid xs={12} sm={4} md={3} lg={4}>
			<Summary></Summary>
		  </Grid>
		  <Grid xs={6} sm={4} md={3} lg={8}>
			
		  </Grid>
		  <Grid xs={12} lg={2}>
             <ControlPanel />
         </Grid>
		  <Grid xs={12} lg={10}>
             <WeatherChart></WeatherChart>
         </Grid>
	</Grid>
	
  )
}

export default App
