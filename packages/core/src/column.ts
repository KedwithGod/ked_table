import { Column } from './types'

/**
 * Helper function to create a column definition
 */
export function createColumn<TData = any>(
    column: Column<TData>
): Column<TData> {
    return {
        sortable: true,
        filterable: true,
        resizable: true,
        pinned: false,
        hidden: false,
        ...column,
    }
}

/**
 * Helper to create multiple columns
 */
export function createColumns<TData = any>(
    columns: Column<TData>[]
): Column<TData>[] {
    return columns.map(createColumn)
}
