import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import Pagination from "../components/Pagination";

function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [activeFilters, setActiveFilters] = useState({}); // store active filters from PropertyFilters

    const totalPages = Math.ceil(total / itemsPerPage);
    const startItem = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, total);

    useEffect(() => {
        loadProperties({}, 1);
    }, []);


    async function loadProperties(filters = {}, page = 1) {
        try {
            setLoading(true);
            setError(null);

            const offset = (page - 1) * itemsPerPage;

            const data = await fetchProperties({
                ...filters,
                limit: itemsPerPage,
                offset: offset
            });

            setProperties(data.results);
            setTotal(data.total);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(filters) {
        setActiveFilters(filters);
        setCurrentPage(1);

        await loadProperties(filters, 1);
    }

    async function handleClear() {
        setActiveFilters({});
        setCurrentPage(1);

        await loadProperties({}, 1)
    }

    async function handlePageChange(page) {
        setCurrentPage(page);

        await loadProperties(activeFilters, page);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <h1>Properties</h1>

            <PropertyFilters
                onSearch={handleSearch}
                onClear={handleClear}
            />

            {loading ? (
                <p>Loading properties...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <p>
                        Showing {startItem}-{endItem} of {total} properties
                    </p>

                    {properties.length === 0 ? (
                        <p>No properties found matching your filters.</p>
                    ) : (
                        <>
                            <div className="property-grid">
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default ListingsPage;