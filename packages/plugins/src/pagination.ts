import { createPlugin, PaginationState } from '@table-plugin/core'

export interface PaginationOptions {
    pageSize?: number
    pageIndex?: number
}

/**
 * Pagination plugin - enables client-side pagination
 */
export function usePagination(options: PaginationOptions = {}) {
    const { pageSize = 10, pageIndex = 0 } = options

    return createPlugin({
        name: 'pagination',

        state: {
            pagination: {
                pageIndex,
                pageSize,
            } as PaginationState,
        },

        methods: {
            transformRows: (rows: any[], state: any) => {
                const { pageIndex, pageSize } =
                    (state.pagination as PaginationState) || {}
                const start = pageIndex * pageSize
                return rows.slice(start, start + pageSize)
            },

            setPageIndex: (index: number) => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    pagination: { ...state.pagination, pageIndex: index },
                }))
            },

            setPageSize: (size: number) => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    pagination: { pageIndex: 0, pageSize: size },
                }))
            },

            nextPage: () => (table: any) => {
                const { pageIndex } = table.getState().pagination as PaginationState
                const pageCount = table.getPageCount()
                if (pageIndex < pageCount - 1) {
                    table.setPageIndex(pageIndex + 1)
                }
            },

            previousPage: () => (table: any) => {
                const { pageIndex } = table.getState().pagination as PaginationState
                if (pageIndex > 0) {
                    table.setPageIndex(pageIndex - 1)
                }
            },

            getPageCount: () => (table: any) => {
                const { pageSize } = table.getState().pagination as PaginationState
                // Get total rows before pagination
                const totalRows = table.options.data.length
                return Math.ceil(totalRows / pageSize)
            },

            canPreviousPage: () => (table: any) => {
                const { pageIndex } = table.getState().pagination as PaginationState
                return pageIndex > 0
            },

            canNextPage: () => (table: any) => {
                const { pageIndex } = table.getState().pagination as PaginationState
                const pageCount = table.getPageCount()
                return pageIndex < pageCount - 1
            },
        },
    })
}
