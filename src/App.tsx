import Header from "./components/layout/Header";

import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
    return (
        <div className="App w-full">
            <Header />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
