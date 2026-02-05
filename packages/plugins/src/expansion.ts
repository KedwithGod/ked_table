
import { createPlugin } from 'ked-table-core'

export interface ExpansionOptions {
    enableMultiRowExpansion?: boolean
}

/**
 * Expansion plugin - enables row expansion
 */
export function useExpansion(options: ExpansionOptions = {}) {
    const { enableMultiRowExpansion = true } = options

    return createPlugin({
        name: 'expansion',

        state: {
            expanded: {} as Record<string, boolean>,
        },

        methods: {
            toggleRowExpanded: (rowId: string, value?: boolean) => (table: any) => {
                const current = table.getState().expanded || {}
                const newValue = value ?? !current[rowId]

                if (!enableMultiRowExpansion) {
                    table.setState((state: any) => ({
                        ...state,
                        expanded: newValue ? { [rowId]: true } : {},
                    }))
                    return
                }

                const newExpanded = { ...current }
                if (newValue) {
                    newExpanded[rowId] = true
                } else {
                    delete newExpanded[rowId]
                }

                table.setState((state: any) => ({
                    ...state,
                    expanded: newExpanded,
                }))
            },

            getIsRowExpanded: (rowId: string) => (table: any) => {
                const expanded = table.getState().expanded || {}
                return !!expanded[rowId]
            },

            resetExpansion: () => (table: any) => {
                table.setState((state: any) => ({
                    ...state,
                    expanded: {},
                }))
            }
        }
    })
}
