import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSheet } from "../services/api";
import DataTable from "../components/tables/DataTable";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function TablePage() {

    const { sheet } = useParams()

    const [headers, setHeaders] = useState([])
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchSheet(sheet)
                setHeaders(data.headers)
                setRows(data.rows)
            } catch {
                setError("Failed to load data")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [sheet])

    if (loading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    return <DataTable headers={headers} rows={rows} />

}