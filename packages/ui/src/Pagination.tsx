
import './Pagination.css'

export interface PaginationProps {
    pageIndex: number
    pageSize: number
    pageCount: number
    canPreviousPage: boolean
    canNextPage: boolean
    onPageChange: (pageIndex: number) => void
    onPageSizeChange: (pageSize: number) => void
    pageSizeOptions?: number[]
}

/**
 * Pagination component
 */
export function Pagination({
    pageIndex,
    pageSize,
    pageCount,
    canPreviousPage,
    canNextPage,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
    return (
        <div className="pagination">
            <div className="pagination-info">
                Page {pageIndex + 1} of {pageCount}
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={() => onPageChange(0)}
                    disabled={!canPreviousPage}
                >
                    ««
                </button>
                <button
                    className="pagination-button"
                    onClick={() => onPageChange(pageIndex - 1)}
                    disabled={!canPreviousPage}
                >
                    ‹
                </button>
                <button
                    className="pagination-button"
                    onClick={() => onPageChange(pageIndex + 1)}
                    disabled={!canNextPage}
                >
                    ›
                </button>
                <button
                    className="pagination-button"
                    onClick={() => onPageChange(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    »»
                </button>
            </div>

            <div className="pagination-size">
                <select
                    value={pageSize}
                    onChange={e => onPageSizeChange(Number(e.target.value))}
                    className="pagination-select"
                >
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>
                            {size} per page
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
