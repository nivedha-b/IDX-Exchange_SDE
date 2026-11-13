import { fetchProperties } from "./client";

test("fetchProperties returns property data", async () => {
    const mockData = {
        total: 1,
        limit: 20,
        offset: 0,
        results: [
            {
                id: 1,
                L_City: "Irvine"
            }
        ]
    };

    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
    });

    const data = await fetchProperties();

    expect(data).toEqual(mockData);
});


test("fetchProperties builds URL with filters", async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
            total: 0,
            results: []
        })
    });

    await fetchProperties({
        city: "Irvine",
        beds: "3"
    });

    expect(global.fetch).toHaveBeenCalledWith(
        "/api/properties?city=Irvine&beds=3"
    );
});


test("fetchProperties throws an error when request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: false
    });

    await expect(fetchProperties()).rejects.toThrow(
        "Failed to fetch properties"
    );
});