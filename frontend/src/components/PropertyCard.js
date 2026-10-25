function PropertyCard({ property }) {
    return (
        <div className="property-card">
            <h2>{property.L_SystemPrice}</h2>
            <p>{property.L_Address}</p>
            <p>
                {property.L_City}, {property.L_State}
            </p>
        </div>
    );
}

export default PropertyCard;