import  { useMemo, useState } from "react";
import type { ForecastData } from "@/api/types";
// Import your Card, CardContent, CardHeader etc. as before
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO, isToday } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

function groupByDay(list: ForecastData["list"]) {
  return list.reduce((acc, item) => {
    const day = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<string, ForecastData["list"]>);
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const grouped = useMemo(() => groupByDay(data.list), [data]);
  const days = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const [selectedDay, setSelectedDay] = useState(() => days[0] || "");

  const Chartdata = useMemo(() => {
    if (!selectedDay) return [];
    const selectedDate = parseISO(selectedDay);

    if (isToday(selectedDate)) {
      return data.list.slice(0, 6).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
      }));
    }
    const items = grouped[selectedDay] ?? [];
    return items.slice(0,6).map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));
  }, [data, grouped, selectedDay]);

  return (
    <Card className="flex-1">
      <CardHeader> 
        <CardTitle>Hourly Temperature</CardTitle>
        {days.length > 1 && (
          <div className="mt-3">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Day..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Days</SelectLabel>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {format(parseISO(day), "EEE, MMM d")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full pt-2">
          {Chartdata.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10">
              No data available for this day.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Chartdata}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  domain={['dataMin - 3', 'dataMax + 3']}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                />
                <Line
                  dataKey="temp"
                  type="monotone"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={true}
                  isAnimationActive={true}
                  name="Temperature"
                />
                <Line
                  dataKey="feels_like"
                  type="monotone"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  isAnimationActive={true}
                  name="Feels Like"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg bg-white/85 text-black px-3 py-2 shadow-md text-xs space-y-1 backdrop-blur-sm">
                          <div>
                            <p className="text-[0.65rem] uppercase text-gray-600">Temperature</p>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
