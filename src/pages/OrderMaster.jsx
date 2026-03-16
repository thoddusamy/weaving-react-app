import { useEffect, useState } from "react";
import { fetchSheet } from "../services/api";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import DataTable from "../components/tables/DataTable";

export default function OrderMaster() {

    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const data = await fetchSheet("OrderMaster");
                setHeaders(data.headers || []);
                setRows(data.rows || []);
            } catch (err) {
                setError("Unable to fetch data from server.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <Loader />;

    if (error) return <ErrorMessage message={error} />;

    return <DataTable headers={headers} rows={rows} />;
}