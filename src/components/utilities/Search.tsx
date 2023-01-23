import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { default as CountryModel } from "../../models/Country";

export default function Search() {
    const { searchQuery } = useParams();

    const search = useQuery({
        queryKey: ["search", searchQuery],
        queryFn: async (): Promise<CountryModel[]> => {
            const response = await axios.get(import.meta.env.VITE_COUNTRY_API + "/name/" + searchQuery);
            return response.data;
        },
    });

    if (search.isLoading || search.isIdle) {
        return <Loading />;
    }
    if (search.isError) {
        return <h3 className="flex w-full h-full justify-center items-center">Nothing found</h3>;
        // return <Error error={search.error} />;
    }
    // if () {
    //     return <>Nothing found</>;
    // }
    return (
        <div className="container columns-1 mx-auto text-center">
            {search.data.map((country) => {
                return (
                    <div key={country.ccn3}>
                        <Link to={"/country/" + country.cca3}>
                            <div className="flex justify-center gap-2 hover:text-primary-400">
                                <img className="w-8 h-fit pt-1.5" src={country.flags.svg} />
                                <h3>{country.name.common}</h3>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
