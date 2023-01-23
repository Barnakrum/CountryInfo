import CountryList from "./components/country/CountryList";
import { createBrowserRouter } from "react-router-dom";
import Country from "./components/country/Country";
import Search from "./components/utilities/Search";

const router = createBrowserRouter([
    { path: "/", element: <CountryList /> },
    { path: "/country/:countryCode", element: <Country /> },
    { path: "/search/:searchQuery", element: <Search /> },
]);

export default router;
