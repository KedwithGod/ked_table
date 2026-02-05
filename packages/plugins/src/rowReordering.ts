import { createPlugin, TableState } from 'ked-table-core'

/**
 * Row Reordering plugin - enables manual and DnD row reordering
 */
export const useRowReordering = () => {
    return createPlugin({
        name: 'rowReordering',
        state: {
            rowOrder: [] as any[], // IDs or indices
        },
        methods: {
            setRowOrder: (order: any[]) => (table: any) => {
                table.setState((old: TableState) => ({
                    ...old,
                    rowOrder: order,
                }))
            },
            moveRow: (fromIndex: number, toIndex: number) => (table: any) => {
                const state = table.getState()
                const data = table.options.data
                const currentOrder = state.rowOrder && state.rowOrder.length > 0
                    ? state.rowOrder
                    : data.map((_: any, i: number) => i)

                const newOrder = [...currentOrder]
                const item = newOrder[fromIndex]
                newOrder.splice(fromIndex, 1)
                newOrder.splice(toIndex, 0, item)

                table.setRowOrder(newOrder)
            },
            moveRowRelative: (index: number, delta: number) => (table: any) => {
                const state = table.getState()
                const data = table.options.data
                const currentOrder = state.rowOrder && state.rowOrder.length > 0
                    ? state.rowOrder
                    : data.map((_: any, i: number) => i)

                const newIndex = Math.max(0, Math.min(currentOrder.length - 1, index + delta))
                if (newIndex === index) return

                const newOrder = [...currentOrder]
                const item = newOrder[index]
                newOrder.splice(index, 1)
                newOrder.splice(newIndex, 0, item)

                table.setRowOrder(newOrder)
            },
            sortOrder: (desc: boolean = false) => (table: any) => {
                const state = table.getState()
                const data = table.options.data
                const currentOrder = state.rowOrder && state.rowOrder.length > 0
                    ? state.rowOrder
                    : data.map((_: any, i: number) => i)

                const newOrder = [...currentOrder].sort((a, b) => desc ? b - a : a - b)
                table.setRowOrder(newOrder)
            },
            transformRows: (data: any[], state: TableState) => {
                const { rowOrder } = state
                if (!rowOrder || rowOrder.length === 0) return data

                return rowOrder.map((index: number) => data[index]).filter(Boolean)
            }
        }
    })
}
