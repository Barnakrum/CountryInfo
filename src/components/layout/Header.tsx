import Menu from "./Menu";
import Title from "./Title";

export default function Header() {
    return (
        <div className="h-20 p-4 flex justify-between items-center border-b-2 rounded-xl border-blue-900">
            <Title />
            <Menu />
        </div>
    );
}
