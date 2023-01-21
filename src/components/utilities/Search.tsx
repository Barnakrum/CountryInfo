import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
    return (
        <div>
            <div className="flex flex-row text-primary-400 hover:text-primary-400">
                <div className="px-2 pt-1.5 rounded-l-xl md:bg-neutral-800 bg-neutral-900">
                    <AiOutlineSearch />
                </div>
                <input className="text-white w-full border-t-2 outline-none  border-b-2 border-r-2 border-neutral-900 md:bg-neutral-900 md:border-neutral-800 rounded-r-xl bg-neutral-800" />
            </div>
        </div>
    );
}
