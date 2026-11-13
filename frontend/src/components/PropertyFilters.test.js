import { render, screen, fireEvent } from "@testing-library/react";
import PropertyFilters from "./PropertyFilters";

test("renders all filter inputs", () => {
    render(
        <PropertyFilters
            onSearch={jest.fn()}
            onClear={jest.fn()}
        />
    );

    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("ZIP Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Maximum Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Beds")).toBeInTheDocument();
    expect(screen.getByLabelText("Baths")).toBeInTheDocument();
});

test("search passes correct filters", () => {
    const mockOnSearch = jest.fn();

    render(
        <PropertyFilters
            onSearch={mockOnSearch}
            onClear={jest.fn()}
        />
    );

    fireEvent.change(screen.getByLabelText("City"), {
        target: {
            value: "Irvine"
        }
    });

    fireEvent.change(screen.getByLabelText("Beds"), {
        target: {
            value: "3"
        }
    });

    fireEvent.click(
        screen.getByRole("button", { name: "Search" })
    );

    expect(mockOnSearch).toHaveBeenCalledWith({
        city: "Irvine",
        beds: "3"
    });
});


test("clears filters when Clear Filters is clicked", () => {
    const mockOnClear = jest.fn();

    render(
        <PropertyFilters
            onSearch={jest.fn()}
            onClear={mockOnClear}
        />
    );

    const cityInput = screen.getByLabelText("City");

    fireEvent.change(cityInput, {
        target: { value: "Irvine"}
    });

    expect(cityInput).toHaveValue("Irvine");

    fireEvent.click(
        screen.getByRole("button", { name: "Clear Filters"})
    );

    expect(cityInput).toHaveValue("");
    expect(mockOnClear).toHaveBeenCalled();
})