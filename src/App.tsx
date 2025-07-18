import './App.css'
import { ThemeProvider } from './components/context/theme-provider'
import Layout from './components/layout'

import { BrowserRouter, Route, Routes} from "react-router-dom"
import WeatherDashboard from './pages/Weatherdashboard' 
import CityPage from './pages/city-page'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5*60*1000,
      gcTime:10*60*1000,
      retry:false,
      refetchOnWindowFocus:false,
    }
  }
});

function App() {
 

  return ( 

    
     <QueryClientProvider client={queryClient}>
      
    
      <BrowserRouter>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Layout>
          <Routes>
            <Route path="/" element={ <WeatherDashboard /> } /> 
             <Route path="/city/:cityName" element={ <CityPage /> } /> 
           
           

            
          </Routes>
        </Layout>
      </ThemeProvider>
      </BrowserRouter>
       <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>




  )
   
      
  
  
}

export default App
