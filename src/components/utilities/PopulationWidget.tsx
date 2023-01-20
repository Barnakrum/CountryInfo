import axios from "axios";
import { useQuery } from "react-query";
import CountryInfo from "../../models/UnitedNations/CountryInfo";
import CountryPopulation from "../../models/UnitedNations/CountryPopulation";
import Error from "./Error";
import LineGraph from "./LineGraph";
import Loading from "./Loading";

export default function PopulationWidget(props: { countryCode: string }) {
    const populationQuery = useQuery({
        queryKey: ["population", props.countryCode],
        queryFn: async () => {
            const countryIdRequest = await axios.get("https://population.un.org/dataportalapi/api/v1/locations/" + props.countryCode + "?sort=id&format=json");
            const countryIdData: CountryInfo[] = countryIdRequest.data;
            const countryPopulationRequest = await axios.get("https://population.un.org/dataportalapi/api/v1/data/indicators/49/locations/" + countryIdData[0].id + "?startYear=2000&endYear=2020&sexes=3&pagingInHeader=false&format=json");
            const countryPopulationData: CountryPopulation[] = countryPopulationRequest.data.data;
            return countryPopulationData;
        },
    });
    if (populationQuery.isLoading || populationQuery.isIdle) {
        return <Loading />;
    }
    if (populationQuery.isError) {
        return <Error error={populationQuery.error} />;
    }

    return (
        <>
            <LineGraph countryPopulationData={populationQuery.data} />
        </>
    );
}
