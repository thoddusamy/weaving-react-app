import { useState } from "react";
import { menuItems } from "../../config/menu";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <aside className="w-[280px] bg-slate-900 text-white flex flex-col">

            <div className="p-6 font-bold text-lg">
                WEAVING
            </div>

            <nav className="flex-1 overflow-y-auto">

                {menuItems.map((menu, i) => (

                    <div key={i}>

                        <button
                            className="w-full text-left px-6 py-3 hover:bg-slate-800"
                            onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        >
                            <i className={`fa-solid ${menu.icon} mr-2`}></i>
                            {menu.title}
                        </button>

                        {openMenu === i && (

                            <div className="pl-8">

                                {menu.subs.map((sub) => (

                                    <Link
                                        key={sub.path}
                                        to={sub.path}
                                        className="block py-2 text-sm hover:text-indigo-400"
                                    >
                                        {sub.name}
                                    </Link>

                                ))}

                            </div>

                        )}

                    </div>

                ))}

            </nav>

        </aside>
    );
}