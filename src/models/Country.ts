export default interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: CommonAndOfficialName;
        };
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: Currency;
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: {
        [key: string]: CommonAndOfficialName;
    };
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: {
        [key: string]: Demonym;
    };
    flag: string;
    maps: MapLinks;
    population: number;
    gini: {
        [key: string]: number;
    };
    car: {
        signs: string;
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: PngSvg;
    coatOfArms: PngSvg;
    startOfWeek: string;
    capitalInfo: {
        latlng: number[];
    };
    postalCode: {
        format: string;
        regex: string;
    };
}

interface CommonAndOfficialName {
    official: string;
    common: string;
}

interface Currency {
    name: string;
    symbol: string;
}

interface MapLinks {
    googleMaps: string;
    openStreetMaps: string;
}

interface Demonym {
    f: string;
    m: string;
}

interface PngSvg {
    png: string;
    svg: string;
}
