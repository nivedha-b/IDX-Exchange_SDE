import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";

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

    async function handleSearch(filters) {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchProperties(filters);

            setProperties(data.results);
            setTotal(data.total);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleClear() {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchProperties();

            setProperties(data.results);
            setTotal(data.total)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading properties...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Properties</h1>

            <PropertyFilters
                onSearch={handleSearch}
                onClear={handleClear}
            />

            <p>Showing {properties.length} of {total} properties</p>

            {properties.length === 0 ? (
                <p>No properties found matching your filters.</p>
            ) : (
                <div className="property-grid">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListingsPage;