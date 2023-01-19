import { useQuery } from "react-query";
import { default as CountryModel } from "../models/Country";
import axios from "axios";

const useAllCountries = () =>
    useQuery({
        queryKey: ["allCountries"],
        queryFn: async (): Promise<CountryModel[]> => {
            return await (
                await axios.get(import.meta.env.VITE_COUNTRY_API + "/all")
            ).data;
        },
    });

export default useAllCountries;
