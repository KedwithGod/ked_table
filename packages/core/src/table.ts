
import { TableOptions, Table, TableState, Column } from './types'

/**
 * Creates a headless table instance with plugin support
 */
export function createTable<TData = any>(
    options: TableOptions<TData>
): Table<TData> {
    // Gather plugin states
    let pluginState = {}
    const plugins = options.plugins || []
    plugins.forEach(plugin => {
        if (plugin.state) {
            pluginState = { ...pluginState, ...plugin.state }
        }
    })

    // Initialize state (defaults < plugin states < user state)
    const initialState: TableState = {
        sorting: { sortBy: [] },
        filtering: { filters: [], globalFilter: '' },
        pagination: { pageIndex: 0, pageSize: 10 },
        selection: {},
        columnOrder: options.columns.map(c => c.id),
        columnVisibility: {},
        columnSizing: {},
        expanded: {},
        ...pluginState,
        ...options.state,
    }

    let state = initialState

    // Create table instance
    const table: Table<TData> = {
        options,
        state,

        getState: () => state,

        setState: updater => {
            const newState =
                typeof updater === 'function' ? updater(state) : updater
            state = newState
            table.state = newState
            options.onStateChange?.(state)

            // Trigger plugin hooks
            plugins.forEach(plugin => {
                plugin.hooks?.onStateChange?.(state, table)
            })
        },

        getRows: () => {
            let rows = options.data

            // Apply plugin transformations in order
            plugins.forEach(plugin => {
                if (plugin.methods?.transformRows) {
                    rows = plugin.methods.transformRows(rows, state, table)
                }
            })

            return rows
        },

        getColumns: () => options.columns,

        getVisibleColumns: () => {
            const orderedColumns = state.columnOrder
                ? state.columnOrder
                    .map(id => options.columns.find(col => col.id === id))
                    .filter(Boolean) as Column<TData>[]
                : options.columns

            return orderedColumns.filter(
                col => state.columnVisibility?.[col.id] !== false && !col.hidden
            )
        },

        reset: () => {
            table.setState(initialState)
        },
    }

    // Attach plugin methods to table instance
    plugins.forEach(plugin => {
        if (plugin.methods) {
            Object.entries(plugin.methods).forEach(([name, method]) => {
                if (name !== 'transformRows') {
                    table[name] = (...args: any[]) => {
                        const result = method(...args)
                        if (typeof result === 'function') {
                            return result(table)
                        }
                        return result
                    }
                }
            })
        }
    })

    // Call plugin init hooks
    plugins.forEach(plugin => {
        plugin.hooks?.onInit?.(table)
    })

    return table
}
