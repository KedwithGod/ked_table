import { createPlugin, TableState } from 'ked-table-core'

export interface ReorderingState extends TableState {
    reordering: {
        columnOrder: string[]
    }
}

export interface ReorderingOptions {
    enableDrag?: boolean
}

export const useReordering = () => {
    return createPlugin({
        name: 'reordering',
        methods: {
            setColumnOrder: (order: string[]) => (table: any) => {
                table.setState((old: TableState) => ({
                    ...old,
                    columnOrder: order,
                }))
            },
            moveColumn: (dragIndex: number, hoverIndex: number) => (table: any) => {
                const state = table.getState()
                const currentOrder = state.columnOrder || table.options.columns.map((c: any) => c.id)

                const newOrder = [...currentOrder]
                const draggedItem = newOrder[dragIndex]

                newOrder.splice(dragIndex, 1)
                newOrder.splice(hoverIndex, 0, draggedItem)

                table.setColumnOrder(newOrder)
            },
            moveColumnRelative: (index: number, delta: number) => (table: any) => {
                const state = table.getState()
                const currentOrder = state.columnOrder || table.options.columns.map((c: any) => c.id)

                const newIndex = Math.max(0, Math.min(currentOrder.length - 1, index + delta))
                if (newIndex === index) return

                const newOrder = [...currentOrder]
                const item = newOrder[index]
                newOrder.splice(index, 1)
                newOrder.splice(newIndex, 0, item)

                table.setColumnOrder(newOrder)
            },
            // Hook to transform columns based on order
            transformColumns: (columns: any[], state: TableState) => {
                const { columnOrder } = state
                if (!columnOrder || columnOrder.length === 0) return columns

                const orderedColumns = [...columns].sort((a, b) => {
                    const indexA = columnOrder.indexOf(a.id)
                    const indexB = columnOrder.indexOf(b.id)

                    if (indexA === -1 && indexB === -1) return 0
                    if (indexA === -1) return 1
                    if (indexB === -1) return -1

                    return indexA - indexB
                })

                return orderedColumns
            }
        }
    })
}
