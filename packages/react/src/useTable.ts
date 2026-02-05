import { useMemo, useState, useEffect } from 'react'
import { createTable, TableOptions, Table } from 'ked-table-core'

/**
 * React hook for creating and managing a table instance
 */
export function useTable<TData = any>(
    options: TableOptions<TData>
): Table<TData> {
    const [state, setState] = useState(options.state || {})

    const table = useMemo(() => {
        return createTable({
            ...options,
            state,
            onStateChange: newState => {
                setState(newState)
                options.onStateChange?.(newState)
            },
        })
    }, [
        options.data,
        options.columns,
        options.plugins,
        options.styleRules,
        // Intentionally not including state to avoid infinite loops
    ])

    // Update table state when external state changes
    useEffect(() => {
        if (options.state && JSON.stringify(options.state) !== JSON.stringify(table.getState())) {
            table.setState(options.state)
        }
    }, [options.state, table])

    return table
}
