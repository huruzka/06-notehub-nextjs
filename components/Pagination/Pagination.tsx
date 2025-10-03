import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps {
    totalPages: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number; 
}

const Pagination = ({
    totalPages,
    onPageChange,
    currentPage,
}: PaginationProps) => {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
     
    );
};

export default Pagination