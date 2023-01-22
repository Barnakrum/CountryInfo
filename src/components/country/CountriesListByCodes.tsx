import axios from "axios";
import { useQuery } from "react-query";
import { default as CountryModel } from "../../models/Country";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";
import { BiLinkExternal } from "react-icons/bi";

export default function CountriesListByCodes(props: { codes: string[] }) {
    const byCodeCountries = useQuery({
        queryKey: ["country", "code", props.codes],
        queryFn: async (): Promise<CountryModel[] | null> => {
            if (props.codes === undefined) {
                return null;
            }
            const apiResponse = await axios.get(import.meta.env.VITE_COUNTRY_API + "/alpha?codes=" + props.codes.join(","));
            //const apiResponse = await axios.get("https://restcountries.com/v3.1/alpha?codes=can,mex");

            const data = await apiResponse.data;
            return data;
        },
    });

    if (byCodeCountries.isLoading || byCodeCountries.isIdle) {
        return <Loading />;
    }
    if (byCodeCountries.isError) {
        return <Error error={byCodeCountries.error} />;
    }
    if (byCodeCountries.data === null) {
        return <h4 className="px-4">None</h4>;
    }

    return (
        <div className="px-4">
            {byCodeCountries.data.map((country) => {
                return (
                    <div>
                        <a className="flex gap-1" target="_blank" href={"/country/" + country.cca3}>
                            <span className="flex justify-center items-center">
                                <img className="w-6" src={country.flags.svg} />
                            </span>
                            <h4 className="flex">
                                {country.name.common}
                                <span className="pt-1 pl-1 text-primary-400">
                                    <BiLinkExternal />
                                </span>
                            </h4>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
