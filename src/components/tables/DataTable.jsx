export default function DataTable({ headers = [], rows = [], showActions = false, onEdit, onDelete }) {
    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            {headers.map((h) => (
                                <th
                                    key={h}
                                    className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200"
                                >
                                    {h}
                                </th>
                            ))}
                            {showActions && (
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={headers.length + (showActions ? 1 : 0)}
                                    className="px-6 py-12 text-center text-slate-400 text-sm"
                                >
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, i) => (
                                <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                                    {headers.map((h) => (
                                        <td key={h} className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">
                                                {row[h] || "—"}
                                            </span>
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onEdit && onEdit(row)}
                                                    className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all"
                                                >
                                                    <i className="fa-solid fa-pen-to-square text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(row)}
                                                    className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                                                >
                                                    <i className="fa-solid fa-trash-can text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}