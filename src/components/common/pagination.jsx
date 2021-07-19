import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = totalItems / pageSize;
  let pages = [];
  for (let i = 1; i < totalPages + 1; i++) {
    pages.push(i);
  }

  return (
    <div>
      {totalPages <= 1 ? null : (
        <nav aria-label="...">
          <ul className="pagination">
            {pages.map((page) => {
              return (
                <li
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                  key={page}
                >
                  <a onClick={() => onPageChange(page)} className="page-link">
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
