import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";

function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProperties() {
            try {
                const data = await fetchProperties();

                setProperties(data.results);
                setTotal(data.total);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProperties();
    }, []);

    if (loading) {
        return <p>Loading properties...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Properties</h1>
            <p>Showing {properties.length} of {total} properties</p>

            <pre>{JSON.stringify(properties, null, 2)}</pre>
        </div>
    );
}

export default ListingsPage;