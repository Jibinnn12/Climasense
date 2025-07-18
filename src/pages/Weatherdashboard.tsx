import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"

import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";




import { AlertCircleIcon, MapPin, RefreshCcw } from "lucide-react"


const Weatherdashboard = () => {
  const{coordinates,error:locationError,getLocation,isLoading:locationLoading} = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates);
   const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  
  console.log(weatherQuery.data)
  

 

  function handleRefresh() {
    getLocation();
    if (coordinates) {
       weatherQuery.refetch()
       forecastQuery.refetch()
       locationQuery.refetch()
    }
  }

  if(locationLoading){
    return <WeatherSkeleton></WeatherSkeleton>
  }

  if(locationError){
    return(  <Alert variant="destructive"> 
        <AlertCircleIcon />  
        <AlertTitle className=" font-sans">Unable to find location</AlertTitle>
        <AlertDescription>
          <p className=" font-sans" >{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit font-mono">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location
          </Button>
          
        </AlertDescription>
      </Alert>
      ); 
  }

  if(!coordinates){
    return(  <Alert variant="destructive"> 
        <AlertCircleIcon />  
        <AlertTitle className=" font-sans">Unable to find location</AlertTitle>
        <AlertDescription>
          <p className=" font-sans" >Please enable location acess</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit font-mono">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location
          </Button>
          
        </AlertDescription>
      </Alert>
      ); 
  }

  const locationName = locationQuery.data?.[0];
  const loc = weatherQuery.data?.name

  console.log(loc)
  

 

  if(weatherQuery.error|| forecastQuery.error){

     <Alert variant="destructive"> 
        <AlertCircleIcon />  
        <AlertTitle className=" font-sans">Unable to find location</AlertTitle>
        <AlertDescription>
          <p className=" font-sans" >Failed to fetch Weather Data</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit font-mono">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location
          </Button>
          
        </AlertDescription>
      </Alert>

  }

  if(!weatherQuery.data ||!forecastQuery.data){
    return <WeatherSkeleton></WeatherSkeleton>
  }



  



  return (
    <div>
      
      <div  className="flex items-centre justify-between" >
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
        variant={"outline"}
          size={"icon"}
         onClick={handleRefresh}
         disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw className= {`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin": ""}`} ></RefreshCcw>
        </Button>
      
    </div>
      <div className="grid gap-6">

        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
 
            data={weatherQuery.data}
            locationName={locationName}
            />

            <HourlyTemprature
            data={forecastQuery.data}

             />
        </div>

        <div>


        </div> 


      </div>
    </div>
  )
}

export default Weatherdashboard;