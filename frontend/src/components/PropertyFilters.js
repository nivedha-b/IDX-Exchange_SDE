import { useState } from "react";

function PropertyFilters({ onSearch, onClear}) {
    const [filters, setFilters] = useState({
        city: "",
        zipcode: "",
        minPrice: "",
        maxPrice: "",
        beds: "",
        baths: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFilters({
            ...filters,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== "")
        );

        onSearch(cleanedFilters);
    }

    function handleClear() {
        const emptyFilters = {
            city: "",
            zipcode: "",
            minPrice: "",
            maxPrice: "",
            beds: "",
            baths: ""
        };

        setFilters(emptyFilters);
        onClear();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                City
                <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleChange}
                />
            </label>

            <label>
                ZIP Code
                <input
                    type="text"
                    name="zipcode"
                    value={filters.zipcode}
                    onChange={handleChange}
                />
            </label>

            <label>
                Minimum Price
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                />
            </label>

            <label>
                Maximum Price
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />
            </label>

            <label>
                Beds
                <select
                    name="beds"
                    value={filters.beds}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                </select>
            </label>

            <label>
                Baths
                <select
                    name="baths"
                    value={filters.baths}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                </select>
            </label>

            <button type="submit">
                Search
            </button>

            <button type="button" onClick={handleClear}>
                Clear Filters
            </button>
        </form>
    )
}


export default PropertyFilters;