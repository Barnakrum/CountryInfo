import CountryList from "./components/country/CountryList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{ path: "/", element: <CountryList /> }]);

export default router;
