import { createPlugin, FilteringState } from '@table-plugin/core'

export interface FilteringOptions {
    filterFn?: (row: any, columnId: string, filterValue: any) => boolean
    globalFilterFn?: (row: any, filterValue: string) => boolean
}

/**
 * Filtering plugin - enables column and global filtering
 */
export function useFiltering(options: FilteringOptions = {}) {
    const { filterFn, globalFilterFn } = options

    return createPlugin({
        name: 'filtering',

        state: {
            filtering: {
                filters: [],
                globalFilter: '',
            } as FilteringState,
        },

        methods: {
            transformRows: (rows: any[], state: any) => {
                const { filters, globalFilter } =
                    (state.filtering as FilteringState) || {}

                let filtered = rows

                // Apply column filters
                if (filters?.length) {
                    filtered = filtered.filter(row => {
                        return filters.every(filter => {
                            if (filterFn) {
                                return filterFn(row, filter.id, filter.value)
                            }

                            // Default filter: case-insensitive string match
                            const value = row[filter.id]
                            return String(value)
                                .toLowerCase()
                                .includes(String(filter.value).toLowerCase())
                        })
                    })
                }

                // Apply global filter
                if (globalFilter) {
                    filtered = filtered.filter(row => {
                        if (globalFilterFn) {
                            return globalFilterFn(row, globalFilter)
                        }

                        // Default: search across all values
                        return Object.values(row).some(value =>
                            String(value).toLowerCase().includes(globalFilter.toLowerCase())
                        )
                    })
                }

                return filtered
            },

            setFilter: (columnId: string, value: any) => (table: any) => {
                const current =
                    (table.getState().filtering as FilteringState)?.filters || []
                const newFilters = value
                    ? [
                        ...current.filter(f => f.id !== columnId),
                        { id: columnId, value },
                    ]
                    : current.filter(f => f.id !== columnId)

                table.setState((state: any) => ({
                    ...state,
                    filtering: { ...state.filtering, filters: newFilters },
                }))
            },

            setGlobalFilter: (value: string) => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    filtering: { ...state.filtering, globalFilter: value },
                }))
            },

            resetFilters: () => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    filtering: { filters: [], globalFilter: '' },
                }))
            },
        },
    })
}
