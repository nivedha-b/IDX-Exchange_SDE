export async function fetchProperties(params = {}) {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(`/api/properties${query ? `?${query}` : ""}`);
    if(!response.ok){
        throw new Error("Failed to fetch properties");
    }
    return await response.json();
}

export async function fetchPropertyDetail(id) {
    const response = await fetch(`/api/properties/${id}`);
    if(!response.ok) {
        throw new Error("Failed to fetch property");
    }
    return await response.json();
}