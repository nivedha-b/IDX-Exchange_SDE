import { useEffect, useRef, useState } from "react";

function PropertyImageGallery({ photos }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const lightboxRef = useRef(null);

    useEffect(() => {
        if(lightboxOpen) {
            lightboxRef.current?.focus();
        }
    }, [lightboxOpen]);

    let parsedPhotos = [];
    
    try {
        parsedPhotos = JSON.parse(photos || "[]");

        if(!Array.isArray(parsedPhotos)) {
            parsedPhotos = [];
        }
    } catch(error) {
        parsedPhotos = [];
    }

    if(parsedPhotos.length === 0) {
        return (
            <div className="property-image-gallery">
                <div>No images available</div>
            </div>
        );
    }

    function handlePrevious() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? parsedPhotos.length - 1
                : prevIndex - 1
        );
    }

    function handleNext() {
        setCurrentIndex((currentIndex + 1) % parsedPhotos.length);
    }

    function handleKeyDown(event) {
        if(event.key === "Escape") {
            setLightboxOpen(false);
        }
    }

    return (
        <div className="property-image-gallery">
            <img 
                className="gallery-main-image"
                src={parsedPhotos[currentIndex]}
                alt={`Property ${currentIndex + 1}`}
                onClick={() => setLightboxOpen(true)}
            />

            <div className="thumbnail-strip">
                {parsedPhotos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Property thumbnail ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                        className={index === currentIndex ? "selected-thumbnail" : ""}
                    />
                ))}
            </div>

            {lightboxOpen && (
                <div
                    ref={lightboxRef}
                    className="lightbox"
                    onClick={() => setLightboxOpen(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                        {parsedPhotos.length > 1 && (
                            <button
                                className="lightbox-previous"
                                onClick={handlePrevious}
                            >
                                &lt;
                            </button>
                        )}

                        <img src={parsedPhotos[currentIndex]} alt={`Property ${currentIndex +1}`} />

                        {parsedPhotos.length > 1&& (
                            <button
                                className="lightbox-next"
                                onClick={handleNext}
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default PropertyImageGallery;