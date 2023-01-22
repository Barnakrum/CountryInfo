import { default as WeatherModel } from "../../models/Weather";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

export default function WeatherWidget(props: { lat: number; lon: number }) {
    const time = new Date();
    const weatherQuery = useQuery({
        queryKey: ["weather", props.lat, props.lon],
        queryFn: async (): Promise<WeatherModel> => {
            const { data } = await axios.get(import.meta.env.VITE_WEATHER_API + "&lat=" + props.lat + "&lon=" + props.lon);
            return data;
        },
    });
    if (weatherQuery.isLoading || weatherQuery.isIdle) {
        return <Loading />;
    }
    if (weatherQuery.isError) {
        return <Error error={weatherQuery.error} />;
    }
    return (
        <div className="select-none m-0 p-0">
            <h3 className="mt-4">
                Local time: <span className="text-primary-400">{time.getUTCHours() + weatherQuery.data.timezone / 3600 + ":" + time.getUTCMinutes()}</span>
            </h3>
            <div className="flex flex-col p-2 h-40 w-40 m-4 border-2 border-primary-400 rounded-lg ">
                <div className="">
                    <h4>{weatherQuery.data.main.temp}°C</h4>
                    <div className="group">
                        <h4 className="">{weatherQuery.data.weather[0].main}</h4>
                        <div className="origin-left group-hover:scale-100 scale-0 relative left-16 bg-opacity-50 text-opacity-100 bottom-8  text-sm bg-gray-800 p-2 rounded-xl">{weatherQuery.data.weather[0].description}</div>
                    </div>
                </div>
                <img className="p-0 relative bottom-16 -z-10" src={" http://openweathermap.org/img/wn/" + weatherQuery.data.weather[0].icon + "@2x.png"} />
            </div>
            <div className="text-xs">
                Provided by:{" "}
                <a className="text-primary-400" target={"blank"} href={"https://openweathermap.org"}>
                    openweathermap.org
                </a>
            </div>
        </div>
    );
}
