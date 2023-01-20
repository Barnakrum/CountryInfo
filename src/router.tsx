import CountryList from "./components/country/CountryList";
import { createBrowserRouter } from "react-router-dom";
import Country from "./components/country/Country";

const router = createBrowserRouter([
    { path: "/", element: <CountryList /> },
    { path: "/country/:countryCode", element: <Country /> },
]);

export default router;
