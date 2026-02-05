import { CellContext, StyleRule } from './types'

/**
 * Resolves cell styles based on column, row, and rule-based styling
 */
export function resolveCellStyle<TData = any>(
    context: CellContext<TData>,
    styleRules?: StyleRule<TData>[]
): React.CSSProperties {
    const { column, row, rowIndex = 0 } = context
    let styles: React.CSSProperties = {}

    // 1. Column-level style
    if (column.style) {
        styles = { ...styles, ...column.style }
    }

    // 2. Cell-level style
    if (column.cellStyle) {
        const cellStyle =
            typeof column.cellStyle === 'function'
                ? column.cellStyle(context)
                : column.cellStyle
        if (cellStyle) {
            styles = { ...styles, ...cellStyle }
        }
    }

    // 3. Rule-based styles
    if (styleRules) {
        for (const rule of styleRules) {
            if (rule.when(row, rowIndex)) {
                if (rule.apply.row) {
                    styles = { ...styles, ...rule.apply.row }
                }
                if (rule.apply.cells?.[column.id]) {
                    styles = { ...styles, ...rule.apply.cells[column.id] }
                }
            }
        }
    }

    return styles
}

/**
 * Resolves text-only styles for cell content
 */
export function resolveCellTextStyle<TData = any>(
    context: CellContext<TData>
): React.CSSProperties {
    const { column } = context

    if (column.cellTextStyle) {
        const textStyle =
            typeof column.cellTextStyle === 'function'
                ? column.cellTextStyle(context)
                : column.cellTextStyle
        return textStyle || {}
    }

    return {}
}

/**
 * Resolves row styles based on rule-based styling
 */
export function resolveRowStyle<TData = any>(
    row: TData,
    rowIndex: number,
    styleRules?: StyleRule<TData>[]
): React.CSSProperties {
    let styles: React.CSSProperties = {}

    if (styleRules) {
        for (const rule of styleRules) {
            if (rule.when(row, rowIndex)) {
                if (rule.apply.row) {
                    styles = { ...styles, ...rule.apply.row }
                }
            }
        }
    }

    return styles
}
