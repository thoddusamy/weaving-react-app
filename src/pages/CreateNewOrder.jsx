import { useState, useEffect } from "react";
import { fetchSheet, postOrder } from "../services/api";

export default function CreateNewOrder() {
    const [headers, setHeaders] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadHeaders() {
            try {
                const data = await fetchSheet("CreateNewOrder");
                setHeaders(data.headers || []);
            } catch {
                // server offline — headers stay empty
            }
        }
        loadHeaders();
    }, []);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await postOrder({ sheet: "CreateNewOrder", ...formData });
            alert("✓ Production Order Saved Successfully!");
            setFormData({});
        } catch {
            alert("System Error: Could not save order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden">

                {/* Card Header */}
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800">Order Creation</h3>
                        <p className="text-xs text-slate-500">
                            Enter fabric and scheduling details to initiate production.
                        </p>
                    </div>
                    <i className="fa-solid fa-file-invoice text-slate-300 text-2xl"></i>
                </div>

                {/* Form Fields */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {headers.map((h) => (
                        <div key={h} className="flex flex-col">
                            <label className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-wide">
                                {h}
                            </label>
                            <input
                                type={h.toLowerCase().includes("date") ? "date" : "text"}
                                value={formData[h] || ""}
                                onChange={(e) => handleChange(h, e.target.value)}
                                placeholder={`Enter ${h}`}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm input-focus-ring outline-none transition-all"
                            />
                        </div>
                    ))}

                    {headers.length === 0 && (
                        <div className="col-span-3 text-center py-8 text-slate-400 text-sm">
                            <i className="fa-solid fa-server mb-3 text-2xl block"></i>
                            Connect to the server to load form fields.
                        </div>
                    )}
                </div>

                {/* Card Footer */}
                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button
                        onClick={() => setFormData({})}
                        className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        DISCARD
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-bold text-xs shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all disabled:opacity-70"
                    >
                        {loading && <div className="loader border-indigo-200 border-t-white"></div>}
                        {loading ? "PROCESSING..." : "CONFIRM PRODUCTION ORDER"}
                    </button>
                </div>
            </div>
        </div>
    );
}