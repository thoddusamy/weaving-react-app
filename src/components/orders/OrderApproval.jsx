import { useState, useEffect } from "react";
import { fetchSheet } from "../../services/api";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

function getVal(row, keyName) {
    if (!row) return "N/A";
    const foundKey = Object.keys(row).find(
        (k) => k.toLowerCase().replace(/\s/g, "") === keyName.toLowerCase()
    );
    return foundKey ? row[foundKey] : "N/A";
}

export default function OrderApproval() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchSheet("OrderApproval");
                setRows(data.rows || []);
            } catch {
                setError("Unable to fetch orders from server.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    const approveOrder = (order) => {
        alert(`Order ${getVal(order, "ORDERID")} approved.`);
    };

    const rejectOrder = (order) => {
        alert(`Order ${getVal(order, "ORDERID")} rejected.`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── Left: Pending List ── */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="glass-card rounded-2xl p-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        Pending Review
                    </h4>
                    <div className="space-y-2">
                        {rows.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-6">No pending orders.</p>
                        ) : (
                            rows.map((row, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedOrder(row)}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all flex justify-between items-center group ${selectedOrder === row
                                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                                        : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">
                                            #{getVal(row, "ORDERID")}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-medium">
                                            {getVal(row, "FABRICNAME")}
                                        </p>
                                    </div>
                                    <i className="fa-solid fa-chevron-right text-[10px] text-slate-300 group-hover:text-indigo-500"></i>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── Right: Detail Panel ── */}
            <div className="lg:col-span-8">
                {selectedOrder ? (
                    <div className="glass-card rounded-2xl overflow-hidden">

                        {/* Detail Header */}
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                                        Awaiting Approval
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-800 mt-3">Order Details</h3>
                                    <p className="text-sm text-slate-500">
                                        Transaction ID: {getVal(selectedOrder, "ORDERID")}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => rejectOrder(selectedOrder)}
                                        className="px-4 py-2 rounded-lg text-xs font-bold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        REJECT
                                    </button>
                                    <button
                                        onClick={() => approveOrder(selectedOrder)}
                                        className="px-6 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-colors"
                                    >
                                        APPROVE ORDER
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detail Fields */}
                        <div className="p-8 grid grid-cols-2 gap-y-8 gap-x-12">
                            {Object.entries(selectedOrder).map(([key, val]) => (
                                <div key={key} className="border-b border-slate-50 pb-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                                        {key}
                                    </label>
                                    <p className="font-semibold text-slate-700">{val || "—"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                        <i className="fa-solid fa-mouse-pointer text-4xl mb-3"></i>
                        <p className="font-bold">Select an order from the list to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}