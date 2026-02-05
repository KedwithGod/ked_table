import { createPlugin, SortingState } from 'ked-table-core'

export interface SortingOptions {
    multiSort?: boolean
    sortFn?: (a: any, b: any, columnId: string) => number
}

/**
 * Sorting plugin - enables column sorting
 */
export function useSorting(options: SortingOptions = {}) {
    const { multiSort = true, sortFn } = options

    return createPlugin({
        name: 'sorting',

        state: {
            sorting: { sortBy: [] } as SortingState,
        },

        methods: {
            transformRows: (rows: any[], state: any) => {
                const { sortBy } = (state.sorting as SortingState) || { sortBy: [] }

                if (!sortBy.length) return rows

                return [...rows].sort((a, b) => {
                    for (const sort of sortBy) {
                        let aVal = a[sort.id]
                        let bVal = b[sort.id]

                        // Handle null/undefined
                        if (aVal == null && bVal == null) continue
                        if (aVal == null) return 1
                        if (bVal == null) return -1

                        // Use custom sort function if provided
                        if (sortFn) {
                            const result = sortFn(a, b, sort.id)
                            if (result !== 0) return sort.desc ? -result : result
                            continue
                        }

                        // Default comparison
                        if (aVal < bVal) return sort.desc ? 1 : -1
                        if (aVal > bVal) return sort.desc ? -1 : 1
                    }
                    return 0
                })
            },

            toggleSort: (columnId: string) => (table: any) => {
                const current = (table.getState().sorting as SortingState)?.sortBy || []
                const existing = current.find(s => s.id === columnId)

                let newSort
                if (!existing) {
                    // Add new sort
                    newSort = multiSort
                        ? [...current, { id: columnId, desc: false }]
                        : [{ id: columnId, desc: false }]
                } else if (!existing.desc) {
                    // Toggle to descending
                    newSort = current.map(s =>
                        s.id === columnId ? { ...s, desc: true } : s
                    )
                } else {
                    // Remove sort
                    newSort = current.filter(s => s.id !== columnId)
                }

                table.setState((state: any) => ({
                    ...state,
                    sorting: { sortBy: newSort },
                }))
            },

            setSorting: (sortBy: Array<{ id: string; desc: boolean }>) => (
                table: any
            ) => {
                table.setState((state: any) => ({
                    ...state,
                    sorting: { sortBy },
                }))
            },

            getSortedRowModel: () => (table: any) => {
                return table.getRows()
            },
        },
    })
}
