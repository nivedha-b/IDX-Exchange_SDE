function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];

    // small numbers of pages: show all pages
    if(totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else if(currentPage <= 3) { // near beginning
        pages.push(1, 2, 3, 4, "...", totalPages);
    } else if(currentPage >= totalPages - 2) { // near end
        pages.push(
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
        )
    } else { // in middle
        pages.push(
            1,
            "...", 
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        )
    }

    return (
        <div className="pagination">
            
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {pages.map((page, index) => (
                page === "..." ? (
                    <span key={`ellipsis-${index}`}>
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;