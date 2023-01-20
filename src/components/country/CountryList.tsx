import useAllCountries from "../../hooks/allCountries";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";

export default function CountryList() {
    const allCountriesQuery = useAllCountries();

    if (allCountriesQuery.isLoading || allCountriesQuery.isIdle) {
        return <Loading />;
    }
    if (allCountriesQuery.isError) {
        return <Error error={allCountriesQuery.error} />;
    }
    return (
        <div className="container columns-1 gap-0 lg:columns-2 mx-auto ">
            {allCountriesQuery.data.map((country) => (
                <div className="p-4 h-24 lg:flex even:bg-neutral-800">
                    <div className="flex items-center justify-between text-center text-3xl gap-4">
                        <img className="h-6" src={country.flags.svg} />
                        <div className="text-primary-400">
                            <a href={"/country/" + country.cca3.toLowerCase()}>{country.name.common}</a>
                        </div>
                        <img className="h-8" src={country.coatOfArms.svg} />
                    </div>
                </div>
            ))}
        </div>
    );
}
