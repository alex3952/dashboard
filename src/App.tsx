import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import './App.css'

function App() {
   {/* JSX */}
  return (
    <Grid container spacing={5}>
	      <Grid xs={6} sm={4} md={3} lg={4}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={4}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={4}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={6}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		  </Grid>
	      <Grid xs={6} sm={4} md={3} lg={6}>
			<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
		  </Grid>
		  <Grid xs={12} sm={4} md={3} lg={4}>
			<Summary></Summary>
		  </Grid>
		  <Grid xs={6} sm={4} md={3} lg={8}>
			<BasicTable></BasicTable>
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
