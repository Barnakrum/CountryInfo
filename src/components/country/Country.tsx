import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { default as CountryModel } from "../../models/Country";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";
import { SiWikipedia } from "react-icons/si";
import WeatherWidget from "../utilities/WeatherWidget";
import PopulationWidget from "../utilities/PopulationWidget";
import CountriesListByCodes from "./CountriesListByCodes";

export default function Country() {
    const { countryCode } = useParams();
    const countryQuery = useQuery({
        queryKey: ["country", countryCode],
        queryFn: async (): Promise<CountryModel> => {
            const { data } = await axios.get(import.meta.env.VITE_COUNTRY_API + "/alpha/" + countryCode);
            return data[0];
        },
    });
    const numberFormater = new Intl.NumberFormat("en-us");

    if (countryQuery.isLoading || countryQuery.isIdle) {
        return <Loading />;
    }
    if (countryQuery.isError) {
        return <Error error={countryQuery.error} />;
    }
    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="grid gird-cols-1 gap-4 md:gap-4 md:h-full md:w-4/5">
                    <div className="text-center">
                        <h1 className="text-primary-400">{countryQuery.data.name.common}</h1>
                        <h2 className="">{countryQuery.data.name.official}</h2>
                    </div>
                    <div className="grid gird-cols-1 md:grid-cols-2">
                        <div>
                            <div>
                                <h3>
                                    Capital: <span className="text-primary-300">{countryQuery.data.capital}</span>
                                </h3>
                                <WeatherWidget lat={countryQuery.data.capitalInfo.latlng[0]} lon={countryQuery.data.capitalInfo.latlng[1]} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-8">
                            <div>
                                <h3>
                                    Population:<span className="text-primary-300"> {countryQuery.data.population}</span>
                                </h3>
                                <PopulationWidget countryCode={countryCode || "usa"} />
                            </div>
                            <h3>
                                Member of United Nations:<span className="text-primary-400"> {countryQuery.data.unMember ? <>Yes</> : <>No</>}</span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="grid gird-cols-1 divide-y-2 divide-primary-400 gap-4 md:gap-2 md:min-w-fit h-min md:w-1/5 border-2 p-4 rounded-md border-primary-400">
                    <div>
                        <h4>
                            <div>
                                Region: <span className="text-primary-400">{countryQuery.data.region}</span>
                            </div>
                            <div>
                                Has sea access: <span className="text-primary-400">{countryQuery.data.landlocked ? <>No</> : <>Yes</>}</span>
                            </div>
                            <div>
                                Area:{" "}
                                <span className="text-primary-400">
                                    {numberFormater.format(countryQuery.data.area)}
                                    <span className="text-white"> km^2</span>
                                </span>
                            </div>
                        </h4>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <h4>Flag:</h4>
                        <img className="h-40" src={countryQuery.data.flags.svg} alt={countryQuery.data.name.common + " flag"} />
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <h4>Coat of arms:</h4>
                        <img className="h-40" src={countryQuery.data.coatOfArms.svg} alt={countryQuery.data.name.common + " coat of arms"} />
                    </div>
                    <div>
                        <h3>Neighbours:</h3>
                        <CountriesListByCodes codes={countryQuery.data.borders} />
                    </div>
                </div>
            </div>
            {/* <a className="icon text-3xl w-min h-min" href={"https://en.wikipedia.org/w/index.php?search=" + countryQuery.data.name.common}>
                        <SiWikipedia />
                    </a> */}
        </div>
    );
}
