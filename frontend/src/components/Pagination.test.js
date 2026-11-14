import { render, screen, fireEvent} from "@testing-library/react";
import Pagination from "./Pagination";

test("disables Previous on the first page", () => {
    render(
        <Pagination
            currentPage={1}
            totalPages={10}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
});


test("disables Next on the last page", () => {
    render(
        <Pagination
            currentPage={10}
            totalPages={10}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
});


test("calls onPageChange when a page number is clicked", () => {
    const mockOnPageChange = jest.fn();

    render(
        <Pagination
            currentPage={4}
            totalPages={10}
            onPageChange={mockOnPageChange}
        />
    );

    fireEvent.click(screen.getByRole("button", { name: "5" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
});


test("shows ellipses when current page is in the middle", () => {
    render(
        <Pagination
            currentPage={7}
            totalPages={15}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "7" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();

    expect(screen.getAllByText("...")).toHaveLength(2);
});


test("shows ellipses when current page is near end", () => {
    render(
        <Pagination
            currentPage={13}
            totalPages={15}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "13" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "14" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();

    expect(screen.getAllByText("...")).toHaveLength(1);
});


test("shows ellipses when current page is near beginning", () => {
    render(
        <Pagination
            currentPage={2}
            totalPages={15}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();

    expect(screen.getAllByText("...")).toHaveLength(1);
});


test("shows ellipses when current page is near end", () => {
    render(
        <Pagination
            currentPage={13}
            totalPages={15}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "13" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "14" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "15" })).toBeInTheDocument();

    expect(screen.getAllByText("...")).toHaveLength(1);
});


test("shows all page numbers when there are few pages", () => {
    render(
        <Pagination
            currentPage={2}
            totalPages={7}
            onPageChange={jest.fn()}
        />
    );

    for (let page = 1; page <= 7; page++) {
        expect(screen.getByRole("button", { name: String(page) })).toBeInTheDocument();
    }

    expect(screen.queryByText("...")).not.toBeInTheDocument();
});


test("does not duplicate the last page near the end", () => {
    render(
        <Pagination
            currentPage={23}
            totalPages={24}
            onPageChange={jest.fn()}
        />
    );

    expect(screen.getAllByRole("button", { name: "24" })).toHaveLength(1);
});