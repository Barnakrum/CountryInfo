import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Menu(props: { children: React.ReactNode }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <div className="md:hidden">
                <div
                    className="text-3xl"
                    onClick={() => {
                        if (!showMenu) setShowMenu(true);
                    }}>
                    <AiOutlineMenu />
                </div>
                {showMenu ? (
                    <div
                        onClick={() => {
                            setShowMenu(false);
                        }}
                        className="h-screen bg-neutral-900 fixed inset-0 bg-opacity-80 z-50 ">
                        <div
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            className="absolute select-none h-full w-8/12 inset-0 bottom-auto  left-auto transition-all bg-neutral-800 py-6 px-4 ">
                            <div
                                className="flex pb-3 mb-2 justify-end text-3xl text-white"
                                onClick={() => {
                                    setShowMenu(false);
                                }}>
                                <AiOutlineClose />
                            </div>
                            <div className="text-primary-400 hover:text-white  text-3xl">{props.children}</div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="hidden md:block scale-110 pr-4">
                <>{props.children}</>
            </div>
        </div>
    );
}
