import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { useState } from "react";


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

const formatTemp = (temp:number) => `${Math.round(temp)}°` 

const [selectedUnit,setSelectedUnit]= useState("C")
const [displayTemp,setDisplayTemp]=useState(temp);
const[displayFeels,setDisplayFeels]=useState(feels_like);
const[displaymin,setDisplaymin]=useState(temp_min)
const[displaymax,setDisplaymax]=useState(temp_max)


const FarToCel =()=>{
  setSelectedUnit("C")
  setDisplayTemp(temp)
  setDisplayFeels(feels_like)
  setDisplaymin(temp_min)
  setDisplaymax(temp_max)

}
const CelToFar =()=>{
  const far=(temp*9/5)+32
  const feels=(feels_like*9/5)+32 
  const min=(temp_min*9/5)+32 
  const max=(temp_max*9/5)+32 
  setDisplayFeels(feels)
  setDisplayTemp(far)
  setDisplaymin(min)
  setDisplaymax(max)
  setSelectedUnit("F");
}



  return (
    
    <Card className="overflow-hidden">
  
  <CardContent className="p-6 ">
    <div className="grid gap-20 md:grid-cols-2">
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
       <div className="flex items-center gap-8">
       <p className="text-6xl font-bold tracking-tighter transition-all duration-300">
           {formatTemp(displayTemp)}
       </p>
       <div className="flex items-center gap-2">
        <div 
        role="button"
        onClick={FarToCel}


        className= {` mr-[-2px] cursor-pointer ${selectedUnit==="C"? "font-bold text-white " : "text-muted-foreground" 
        }`}
        >C° </div>


        <p> | </p>


        <div
        role="button"
        onClick={CelToFar}


        className={`cursor-pointer ${selectedUnit==="F"? "font-bold text-white" : " text-muted-foreground"} `}

        > F°</div>




       </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground" >
              Feels like {formatTemp(displayFeels)}
            </p>
            <div className="flex gap-2 text-sm font medium">
                 <span className="flex items-center gap-1 text-blue-500">
                  <ArrowDown className="h-3 w-3"/>
                  {formatTemp(displaymin)} 
                 </span>
                 <span className="flex items-center gap-1 text-red-500">
                  <ArrowUp className="h-3 w-3"/>
                  {formatTemp(displaymax)}
                 </span>
            </div>
            

          </div>
       </div>
           <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500"/>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-sm text-muted-foreground">{humidity}%</p>
              </div>
            </div>

             <div className="flex items-center gap-2">
              
              <Wind className="h-4 w-4  text-gray-600"/>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Wind Speed</p>
                <p className="text-sm text-muted-foreground">{speed} m/s</p>
              </div>
            </div>
           </div>
      </div>

      <div>
        <div className="relative flex items-center justify-center aspect-square w-full max-w-[200px]">
          <img src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`} />
          <div className="absolute bottom-0 text-center">
            <p className="text-m font-semibold capitalize">
              {CurrentWeather.description}
            </p>
          </div>
        </div>
      </div>
    </div>

   
    
    
    
  </CardContent>
 
</Card>
    
  )
}

export default CurrentWeather 