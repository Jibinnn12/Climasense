import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {format} from "date-fns"

 interface HourlyTempratureProps {
 data:ForecastData;
 }

 const HourlyTemprature = ({ data }: HourlyTempratureProps)=>{

    const Chartdata = data.list.slice(0,6).map((item)=>({
        time: format(new Date(item.dt*1000),"ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }));      
    
  

    return <Card className="flex-1">
        <CardHeader>
            <CardTitle>
                Hourly Temprature 
            </CardTitle>
        </CardHeader>
        <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer
                width={"100%"}
                height={"100%"}
                >
                   
             <LineChart  data={Chartdata} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    
   
    <XAxis dataKey="time"
           stroke="#888888"
           fontSize={12}
           tickLine={false}
           axisLine={false}
     />

     <YAxis 
           stroke="#888888"
           domain={[16,32]}
           fontSize={12}
           tickLine={false}
           axisLine={false}
           tickFormatter={(value)=> `${value}°` }
     />
     <Line 
           dataKey="temp"
           type="monotone"
           stroke="#2563eb"
           strokeWidth={2}
           dot={true}
           isAnimationActive={true}
           
     
     />
     <Line 
           dataKey="feels_like"
           type="monotone"
           stroke="#64748b"
           strokeWidth={2}
           dot={false}
           strokeDasharray= "5 5"
           isAnimationActive={true}


           
     
     />
 <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg bg-white/85 text-black px-3 py-2 shadow-md text-xs space-y-1 backdrop-blur-sm">
                    <div>
                      <p className="text-[0.65rem] uppercase text-gray-600">Temprature</p>
                      <p className="font-semibold">{payload[0]?.value}°</p>
                    </div>
                    <div>
                      <p className="text-[0.65rem] uppercase text-gray-600">Feels Like</p>
                      <p className="font-semibold">{payload[1]?.value}°</p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
   
  </LineChart>

                </ResponsiveContainer>

              </div>
        </CardContent>
        
    </Card>
 }

 export default HourlyTemprature;
