import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircleIcon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"


const CityPage = () => {

    const[searchParam] = useSearchParams();
    const params=useParams();
    const lat = parseFloat(searchParam.get("lat")|| "0");
    const lon = parseFloat(searchParam.get("lat")|| "0");
    

    
    const coordinates={lat,lon};

    

    const weatherQuery = useWeatherQuery(coordinates);
       const forecastQuery = useForecastQuery(coordinates);

       if(weatherQuery.error|| forecastQuery.error){

     <Alert variant="destructive"> 
        <AlertCircleIcon />  
        <AlertTitle className=" font-sans">Unable to find location</AlertTitle>
        <AlertDescription>
          <p className=" font-sans" >Failed to fetch Weather Data</p>
          
          
        </AlertDescription>
      </Alert>

  }

  if(!weatherQuery.data ||!forecastQuery.data || !params.cityName){
    return <WeatherSkeleton></WeatherSkeleton>
  }




  return (
    
    <div>

        
      
      
      <div className="grid gap-6">

         <h1 className="text-2xl pl-10 font-bold tracking-tight">{params.cityName}</h1>
        

        <div className="flex flex-col lg:flex-row gap-4">
            
          <CurrentWeather
 
            data={weatherQuery.data}
            
            />

            <HourlyTemprature
            data={forecastQuery.data}

             />
        </div>

        <div>
        <WeatherForecast data={forecastQuery.data}/>

        </div> 


      </div>
    </div>

    
  )
}

export default CityPage