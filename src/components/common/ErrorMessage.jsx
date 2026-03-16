export default function ErrorMessage({ message }) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="glass-card rounded-2xl p-8 text-center max-w-md">
                <i className="fa-solid fa-triangle-exclamation text-red-400 text-3xl mb-4"></i>
                <p className="font-bold text-slate-700 mb-1">Something went wrong</p>
                <p className="text-sm text-slate-500">{message || "Unable to load data from server."}</p>
            </div>
        </div>
    );
}