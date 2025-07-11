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
  console.log(locationQuery.data)
  console.log(weatherQuery.data?.main?.temp)
  

 

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

  const locationName = locationQuery.data?.[0].name;
  console.log(locationName);
  



  return (
    <div>
      
      <div  className="flex items-centre justify-between" >
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button
        variant={"outline"}
          size={"icon"}
         onClick={handleRefresh}
         //disabled={}
        >
          <RefreshCcw className="h-4 w-4"></RefreshCcw>
        </Button>
      
      </div>
      
      </div>
  )
}

export default Weatherdashboard;