import axios, { all } from "axios";
import { useQuery } from "react-query";
import { default as CountryModel } from "../../models/Country";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";
import Country from "./Country";

export default function CountryList() {
    const allCountriesQuery = useQuery({
        queryKey: ["allCountries"],
        queryFn: async (): Promise<CountryModel[]> => {
            return await (
                await axios.get(import.meta.env.VITE_COUNTRY_API + "/all")
            ).data;
        },
    });

    if (allCountriesQuery.isLoading || allCountriesQuery.isIdle) {
        return <Loading />;
    }
    if (allCountriesQuery.isError) {
        return <Error error={allCountriesQuery.error} />;
    }
    return (
        <>
            {allCountriesQuery.data.map((country) => (
                <Country countryData={country} />
            ))}
        </>
    );
}
