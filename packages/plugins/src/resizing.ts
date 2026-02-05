import { createPlugin, TableState } from '@table-plugin/core'

export interface ResizingState extends TableState {
    resizing: {
        columnWidths: Record<string, number>
    }
}

export interface ResizingOptions {
    defaultWidth?: number
    minWidth?: number
    maxWidth?: number
}

export const useResizing = (options: ResizingOptions = {}) => {
    const defaultWidth = options.defaultWidth || 150
    const minWidth = options.minWidth || 50
    const maxWidth = options.maxWidth || 1000

    return createPlugin({
        name: 'resizing',
        state: {
            resizing: {
                columnWidths: {},
            } as ResizingState['resizing'],
        },
        methods: {
            getColumnWidth: (columnId: string, state: ResizingState) => {
                return state.resizing.columnWidths[columnId] || defaultWidth
            },
            setColumnWidth: (columnId: string, width: number) => (table: any) => {
                const safeWidth = Math.min(Math.max(width, minWidth), maxWidth)
                table.setState((old: ResizingState) => ({
                    ...old,
                    resizing: {
                        ...old.resizing,
                        columnWidths: {
                            ...old.resizing.columnWidths,
                            [columnId]: safeWidth,
                        },
                    },
                }))
            },
        },
    })
}
