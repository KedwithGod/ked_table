
import { createPlugin } from 'ked-table-core'

/**
 * Visibility plugin - enables showing/hiding columns
 */
export function useVisibility() {
    return createPlugin({
        name: 'visibility',

        state: {
            columnVisibility: {} as Record<string, boolean>,
        },

        methods: {
            setColumnVisibility: (visibility: Record<string, boolean>) => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    columnVisibility: visibility,
                }))
            },

            toggleColumnVisibility: (columnId: string, value?: boolean) => (table: any) => {
                const current = (table.getState().columnVisibility as Record<string, boolean>) || {}
                const newValue = value ?? !(current[columnId] ?? true)

                table.setState((state: any) => ({
                    ...state,
                    columnVisibility: {
                        ...current,
                        [columnId]: newValue,
                    },
                }))
            },

            resetVisibility: () => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    columnVisibility: {},
                }))
            },

            getIsColumnVisible: (columnId: string) => (table: any) => {
                const current = (table.getState().columnVisibility as Record<string, boolean>) || {}
                return current[columnId] ?? true
            }
        }
    })
}
