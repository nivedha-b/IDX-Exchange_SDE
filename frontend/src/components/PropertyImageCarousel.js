import { useState } from "react";

function PropertyImageCarousel({ photos }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    let parsedPhotos = [];

    try {
        parsedPhotos = JSON.parse(photos || "[]");

        if(!Array.isArray(parsedPhotos)) {
            parsedPhotos = [];
        }
    } catch(error) {
        parsedPhotos = [];
    }

    function handlePrevious(event) {
        event.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? parsedPhotos.length - 1
                : prevIndex - 1
        );
    }

    function handleNext(event) {
        event.stopPropagation();
        setCurrentIndex((currentIndex + 1) % parsedPhotos.length);
    }

    if(parsedPhotos.length === 0) {
        return (
            <div className="property-image-carousel">
                <div>No image available</div>
            </div>
        );
    }

    return (
        <div className="property-image-carousel">
            <img src={parsedPhotos[currentIndex]} alt="Property"/>

            {parsedPhotos.length > 1 && (
                <>
                    <button onClick={handlePrevious}>
                        &lt;
                    </button>

                    <button onClick={handleNext}>
                        &gt;
                    </button>
                </>
            )}

            <span>
                {currentIndex + 1} / {parsedPhotos.length}
            </span>
        </div>
    );
}

export default PropertyImageCarousel;