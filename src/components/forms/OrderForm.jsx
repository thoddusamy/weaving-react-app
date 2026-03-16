import { useState } from "react";
import { submitOrder } from "../../services/api";

export default function OrderForm({ headers }) {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(key, value) {
        setFormData({ ...formData, [key]: value });
    }

    async function handleSubmit() {
        setLoading(true);

        await submitOrder({
            sheet: "CreateNewOrder",
            ...formData,
        });

        alert("Order saved!");
        setFormData({});
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-xl p-8 shadow">
            <div className="grid grid-cols-3 gap-6">
                {headers.map((h) => (
                    <div key={h}>
                        <label className="text-xs font-bold">{h}</label>

                        <input
                            type="text"
                            value={formData[h] || ""}
                            onChange={(e) => handleChange(h, e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 text-white px-6 py-2 rounded"
                >
                    {loading ? "Processing..." : "Confirm Production Order"}
                </button>
            </div>
        </div>
    );
}