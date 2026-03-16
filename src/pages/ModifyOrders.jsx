import { useState, useEffect } from "react";
import { fetchSheet } from "../services/api";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import DataTable from "../components/tables/DataTable";

export default function ModifyOrders() {
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchSheet("ModifyOrders");
                setHeaders(data.headers || []);
                setRows(data.rows || []);
            } catch {
                setError("Unable to fetch data from server.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleEdit = (row) => {
        console.log("Editing:", row);
    };

    const handleDelete = (row) => {
        if (confirm("Permanently delete this record?")) {
            console.log("Deleted:", row);
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <DataTable
            headers={headers}
            rows={rows}
            showActions={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}