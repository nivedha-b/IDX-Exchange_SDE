function PropertyMap({ latitude, longitude }) {
    console.log("Map latitude:", latitude);
    console.log("Map longitude:", longitude);

    if(latitude == null || longitude == null) {
        return null;
    }

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    return (
        <div className="property-map">
            <iframe
                title="Property location"
                src={mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
            />
            <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
            >
                Get Directions
            </a>
        </div>
    );
}

export default PropertyMap;