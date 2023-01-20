import { default as WeatherModel } from "../../models/Weather";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

export default function WeatherWidget(props: { lat: number; lon: number }) {
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
    return <>{weatherQuery.data.timezone}</>;
}
