import { default as CountryModel } from "../../models/Country";

export default function Country(props: { countryData: CountryModel }) {
    return (
        <div>
            {props.countryData.name.common}
            <img src={props.countryData.flags.png} />
        </div>
    );
}
