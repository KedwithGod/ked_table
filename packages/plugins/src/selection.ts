import { createPlugin, SelectionState } from 'ked-table-core'

export interface SelectionOptions {
    enableMultiRowSelection?: boolean
    enableSubRowSelection?: boolean
}

/**
 * Selection plugin - enables row selection
 */
export function useSelection(options: SelectionOptions = {}) {
    const { enableMultiRowSelection = true } = options

    return createPlugin({
        name: 'selection',

        state: {
            selection: {} as SelectionState,
        },

        methods: {
            toggleRowSelection: (rowId: string, value?: boolean) => (
                table: any
            ) => {
                const current = (table.getState().selection as SelectionState) || {}

                if (!enableMultiRowSelection) {
                    // Single selection mode
                    table.setState((state: any) => ({
                        ...state,
                        selection: { [rowId]: value ?? !current[rowId] },
                    }))
                    return
                }

                // Multi selection mode
                const newValue = value ?? !current[rowId]
                const newSelection = { ...current }

                if (newValue) {
                    newSelection[rowId] = true
                } else {
                    delete newSelection[rowId]
                }

                table.setState((state: any) => ({
                    ...state,
                    selection: newSelection,
                }))
            },

            toggleAllRowsSelection: (value?: boolean) => (table: any) => {
                const rows = table.getRows()
                const current = (table.getState().selection as SelectionState) || {}

                const newValue = value ?? Object.keys(current).length !== rows.length

                if (newValue) {
                    // Select all
                    const newSelection: SelectionState = {}
                    rows.forEach((_: any, index: number) => {
                        newSelection[String(index)] = true
                    })
                    table.setState((state: any) => ({
                        ...state,
                        selection: newSelection,
                    }))
                } else {
                    // Deselect all
                    table.setState((state: any) => ({
                        ...state,
                        selection: {},
                    }))
                }
            },

            getIsRowSelected: (rowId: string) => (table: any) => {
                const selection = (table.getState().selection as SelectionState) || {}
                return !!selection[rowId]
            },

            getSelectedRows: () => (table: any) => {
                const selection = (table.getState().selection as SelectionState) || {}
                const rows = table.getRows()
                return Object.keys(selection)
                    .filter(id => selection[id])
                    .map(id => rows[parseInt(id)])
                    .filter(Boolean)
            },

            resetSelection: () => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    selection: {},
                }))
            },
        },
    })
}
