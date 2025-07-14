import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps{
  data:WeatherData;
  locationName?:GeocodingResponse;

}

const CurrentWeather = ({data,locationName} : CurrentWeatherProps) => {

  const{
    weather:[CurrentWeather],
    main:{temp,temp_max,temp_min,feels_like,humidity},
    wind:{speed},
    

  }=data

  console.log("locationName:", locationName);
  

  

  return (
    
    <Card className="overflow-hidden bg-black">
  
  <CardContent className="p-6 ">
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-end gap-1">
                 <h2 className="font-bold text-2xl tracking-tighter">{locationName?.name} </h2> 

                   {locationName?.state && (
                  <span className="text-muted-foreground">
                     ,{locationName?.state}
                  </span>
                 )

                 }

               

                


                 

                 
                 

          </div>
          <p className="text-sm text-muted-foreground">
            {locationName?.country}</p>
        </div>
       
      </div>
    </div>
    
    
    
  </CardContent>
 
</Card>
    
  )
}

export default CurrentWeather 