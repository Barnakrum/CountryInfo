import { useQuery } from "react-query";
import { default as CountryModel } from "../models/Country";
import axios from "axios";

const useAllCountries = () =>
    useQuery({
        queryKey: ["allCountries"],
        queryFn: async (): Promise<CountryModel[]> => {
            let data = await (await axios.get(import.meta.env.VITE_COUNTRY_API + "/all")).data;
            data.sort((a: CountryModel, b: CountryModel) => a.name.common.localeCompare(b.name.common));
            return data;
        },
    });

export default useAllCountries;
