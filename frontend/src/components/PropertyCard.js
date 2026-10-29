function PropertyCard({ property }) {
    let firstPhoto = null;

    try {
        if(property.L_Photos) {
            const photos = JSON.parse(property.L_Photos);
            if(Array.isArray(photos) && photos.length > 0) {
                firstPhoto = photos[0];
            }
        }
    } catch(error) {
        console.error("Invalid photo data:", error);
    }

    return (
        <div className="property-card">
            {firstPhoto ? (<img 
                src={firstPhoto} 
                alt={property.L_Address || "Property"}/>) 
            : (<div className="no-photo">No photo available</div>)}
            <h2>${property.L_SystemPrice?.toLocaleString()}</h2>
            <p>{property.L_Address}</p>
            <p>{property.L_City}, {property.L_State}</p>
            <p>{property.L_Keyword2} beds •{" "}
                {property.LM_Dec_3} baths •{" "}
                {property.LM_Int2_3 ?? "N/A"} sqft</p>
        </div>
    );
}

export default PropertyCard;