import { Link } from "react-router-dom";

export default function Title() {
    return (
        <div className="text-4xl ">
            <Link to="/">
                Title<span className="text-primary-400">.io</span>
            </Link>
        </div>
    );
}
