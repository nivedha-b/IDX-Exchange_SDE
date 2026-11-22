import { useParams } from "react-router-dom";
import { fetchPropertyDetail, fetchOpenHouses } from "../api/client";
import { useState, useEffect } from "react";
import PropertyImageGallery from "../components/PropertyImageGallery";
import PropertyMap from "../components/PropertyMap";

function formatDate(date) {
    if(!date) {
        return "Date unavailable"
    }
    return new Date(date).toLocaleDateString();
}

function formatTime(time) {
    if(!time) {
        return "Time unavailable"
    }
    
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

function getOpenHouseRemarks(allData) {
    if(!allData) {
        return null;
    }

    try {
        const parsedData = JSON.parse(allData);
        return parsedData.OpenHouseRemarks || null;
    } catch(error) {
        return null;
    }
}

function PropertyDetailPage() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openHouses, setOpenHouses] = useState([]);

    useEffect(() => {
        async function loadProperty() {
            try {
                setLoading(true);
                setError(null);

                const propertyData = await fetchPropertyDetail(id);
                const openHouseData = await fetchOpenHouses(id);

                setProperty(propertyData);
                setOpenHouses(openHouseData);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProperty();
    }, [id]);

    if(loading) {
        return <p>Loading property...</p>;
    }
    if(error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <PropertyImageGallery photos={property.L_Photos} />
            <h1>{property.L_Address}</h1>
            <p>{property.L_City}, {property.L_State} {property.L_Zip}</p>
            <h2>${Number(property.L_SystemPrice).toLocaleString()}</h2>

            <div>
                <span>{property.L_Keyword2} beds</span>
                <span> | </span>
                <span>{property.LM_Dec_3} baths</span>
                <span> | </span>
                <span>{property.LM_Int2_3 ?? "N/A"} sqft</span>
                <span> | </span>
                <span>Built {property.YearBuilt ?? "N/A"}</span>
            </div>

            <div>
                <h2>Description</h2>
                <p>{property.L_Remarks || "No description available"}</p>
            </div>

            <div>
                <h2>Property Details</h2>
                <p><strong>Listing ID:</strong>{" "}{property.L_ListingID}</p>
                <p><strong>Bedrooms:</strong>{" "}{property.L_Keyword2 ?? "N/A"}</p>
                <p><strong>Bathrooms:</strong>{" "}{property.LM_Dec_3 ?? "N/A"}</p>
                <p><strong>Square feet:</strong>{" "}{property.LM_Int2_3 ?? "N/A"}</p>
                <p><strong>Year built:</strong>{" "}{property.YearBuilt ?? "N/A"}</p>
            </div>

            <div>
                <h2>Location</h2>
                <PropertyMap
                    latitude={property.LMD_MP_Latitude}
                    longitude={property.LMD_MP_Longitude}
                />
            </div>

            <div>
                <h2>Open Houses</h2>

                {openHouses.length === 0 ? (
                    <p>No open houses scheduled</p>
                ) : (
                    <div>
                        {openHouses.map((openHouse) => {
                            const remarks = getOpenHouseRemarks(openHouse.all_data);

                            return (
                                <div key={openHouse.id}>
                                    <p>{formatDate(openHouse.OpenHouseDate)}</p>
                                    <p>{formatTime(openHouse.OH_StartTime)} -{" "}{formatTime(openHouse.OH_EndTime)}</p>
                                    {remarks && (
                                        <p>{remarks}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyDetailPage;