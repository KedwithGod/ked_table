
import { createPlugin } from 'ked-table-core'

/**
 * Persistence plugin - saves and loads table state from localStorage
 */
export function usePersistence(options: { id: string }) {
    const storageKey = `table-state-${options.id}`

    return createPlugin({
        name: 'persistence',

        hooks: {
            onStateChange: (state: any) => {
                const stateToSave = {
                    sorting: state.sorting,
                    filtering: state.filtering,
                    pagination: state.pagination,
                    columnVisibility: state.columnVisibility,
                    columnOrder: state.columnOrder,
                    columnSizing: state.columnSizing,
                }
                localStorage.setItem(storageKey, JSON.stringify(stateToSave))
            }
        },

        methods: {
            clearSavedState: () => () => {
                localStorage.removeItem(storageKey)
            }
        }
    })
}
