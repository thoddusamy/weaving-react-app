import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems as initialMenu } from "../../config/menu";

export default function Layout({ children }) {
    const [menu, setMenu] = useState(initialMenu);
    const [serverActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = (index) => {
        setMenu((prev) =>
            prev.map((item, i) => ({
                ...item,
                open: i === index ? !item.open : item.open,
            }))
        );
    };

    const currentPageName =
        menu
            .flatMap((m) => m.subs)
            .find((s) => s.path === location.pathname)?.name || "Dashboard";

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">

            {/* ── Sidebar ── */}
            <aside className="w-[280px] bg-[#0f172a] text-slate-300 flex flex-col shrink-0 z-50">

                {/* Logo */}
                <div className="h-20 flex items-center px-8 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <i className="fa-solid fa-industry text-white text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-white font-black tracking-tight leading-none">WEAVING</h1>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                DEPARTMENT
                            </span>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar py-4">
                    {menu.map((item, i) => (
                        <div key={i} className="mb-2">
                            <button
                                onClick={() => toggleMenu(i)}
                                className="w-full flex items-center justify-between px-6 py-3 hover:text-white transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <i className={`${item.icon} w-5 transition-colors group-hover:text-indigo-400`}></i>
                                    <span className="text-sm font-semibold">{item.title}</span>
                                </div>
                                <i
                                    className={`fa-solid fa-chevron-right text-[10px] transition-transform duration-300 ${item.open ? "rotate-90" : ""
                                        }`}
                                ></i>
                            </button>

                            {item.open && (
                                <div className="bg-slate-900/50">
                                    {item.subs.map((sub) => (
                                        <div
                                            key={sub.path}
                                            onClick={() => navigate(sub.path)}
                                            className={`pl-14 pr-6 py-2.5 text-xs cursor-pointer transition-all hover:text-white flex items-center justify-between ${location.pathname === sub.path
                                                    ? "sidebar-item-active text-white"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            {sub.name}
                                            {location.pathname === sub.path && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                            AD
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">Admin User</p>
                            <p className="text-[10px] text-slate-500">System Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 flex flex-col bg-[#f8fafc] relative overflow-hidden">

                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
                    <div>
                        <nav className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            <span>Weaving</span>
                            <span className="mx-2">/</span>
                            <span className="text-indigo-600">{currentPageName}</span>
                        </nav>
                        <h2 className="text-xl font-bold text-slate-800">{currentPageName}</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2 h-2 rounded-full ${serverActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                                    }`}
                            ></div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                                {serverActive ? "Live Sync Active" : "Offline"}
                            </span>
                        </div>
                        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                            <i className="fa-regular fa-bell"></i>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 overflow-y-auto flex-1">{children}</div>
            </main>
        </div>
    );
}