import { useNavigate } from "react-router-dom";
import PropertyImageCarousel from "./PropertyImageCarousel";

function PropertyCard({ property }) {
    const navigate = useNavigate();

    return (
        <div className="property-card" onClick={() => navigate(`/property/${property.L_ListingID}`)}>
            <PropertyImageCarousel photos={property.L_Photos} />
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