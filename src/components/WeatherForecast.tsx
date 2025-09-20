import type { ForecastData } from "@/api/types"
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps{
    data:ForecastData;
}

interface DailyForecast {
    date:number;
    temp_min:number 
    temp_max:number
    humidity:number;
    wind:number;
    weather:{
        id:number;
        main:string;
        description:string;
        icon:string;

        

    }
}
const WeatherForecast = ({data}:WeatherForecastProps) => {

  const dailyForcasts = data.list.reduce ((acc,forecast)=>{
    const date=format(new Date(forecast.dt*1000),"yyyy-MM-dd");

    if(!acc[date]){
        acc[date]= {
            temp_min: forecast.main.temp_min,
            temp_max: forecast.main.temp_max,
            humidity:  forecast.main.humidity,
            wind: forecast.wind.speed,
            weather: forecast.weather[0],
            date:forecast.dt,

        };
    }else{
       
       acc[date].temp_min = Math.min(acc[date].temp_min , forecast.main.temp_min);
        acc[date].temp_max = Math.max(acc[date].temp_min , forecast.main.temp_max);
    }   
   return acc;

  },{} as Record<string,DailyForecast>);

  const nextDays = Object.values(dailyForcasts).slice(0,6); 
    
   const formatTemp = (temp:number) => `${Math.round(temp)}°` 



    
    



  return (
   <Card >
  <CardHeader>
    <CardTitle className="text-white text-base sm:text-lg">Weekly Forecast</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="grid gap-4 ">
      {nextDays.map((day) => (
        <div
          key={day.date}
          className="grid grid-cols-4 items-center  gap-2 border rounded-xl px-4 py-3"
        >
          {/* 1️⃣ Left - Date & Description */}
          <div className="space-y-1">
            <p className="text-sm sm:text-base">
  <span className="font-bold block">
    {format(new Date(day.date * 1000), 'EEEE')}
  </span>{" "}
  <span className="text-sm text-muted-foreground capitalize">
    {format(new Date(day.date * 1000), 'MM/d')}
  </span>
</p>
            
          </div>
          

            
          

            <p className="text-s font-medium  capitalize">
              {day.weather.description} 
            </p>


          

          {/* 2️⃣ Middle - Min/Max Temps */}
          <div className=" md:flex justify-center gap-4">
            <span className="flex items-center text-blue-500 text-sm">
              <ArrowDown className="mr-1 h-4 w-4" />
              {formatTemp(day.temp_min)} 
            </span>
            <span className="flex items-center text-red-500 text-sm">
              <ArrowUp className="mr-1 h-4 w-4" />
              {formatTemp(day.temp_max)}
            </span>
          </div>

          {/* 3️⃣ Right - Humidity & Wind */}
          <div className="flex flex-col   gap-4 items-center  text-sm pr-2">
            <span className="flex items-center gap-1 text-blue-500">
              <Droplets className="h-4 w-4" />
              <span>{day.humidity}%</span>
            </span>

            <span className="flex items-center gap-1 text-gray-400">
              <Wind className="h-4 w-4" />
              <span>{day.wind} m/s</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

    
  )
}

export default WeatherForecast