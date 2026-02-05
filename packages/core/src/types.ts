import React from 'react'

// ============================================================================
// Core Types
// ============================================================================

export interface TableOptions<TData = any> {
    data: TData[]
    columns: Column<TData>[]
    plugins?: Plugin[]
    state?: Partial<TableState>
    onStateChange?: (state: TableState) => void
    styleRules?: StyleRule<TData>[]
}

export interface Table<TData = any> {
    options: TableOptions<TData>
    state: TableState
    getState: () => TableState
    setState: (updater: TableState | ((prev: TableState) => TableState)) => void
    getRows: () => TData[]
    getColumns: () => Column<TData>[]
    getVisibleColumns: () => Column<TData>[]
    reset: () => void
    // Plugin methods will be added dynamically
    [key: string]: any
}

// ============================================================================
// Column Types
// ============================================================================

export interface Column<TData = any> {
    id: string
    accessorKey?: keyof TData
    accessorFn?: (row: TData) => any
    header: string | ((props: HeaderContext<TData>) => React.ReactNode)
    cell?: (props: CellContext<TData>) => React.ReactNode
    footer?: string | ((props: FooterContext<TData>) => React.ReactNode)
    meta?: ColumnMeta

    // Styling
    style?: React.CSSProperties
    cellStyle?: CellStyle<TData>
    cellTextStyle?: CellStyle<TData>

    // Behavior
    sortable?: boolean
    filterable?: boolean
    resizable?: boolean
    pinned?: 'left' | 'right' | false
    hidden?: boolean

    // Sizing
    minWidth?: number
    maxWidth?: number
    width?: number
}

export interface ColumnMeta {
    [key: string]: any
}

export type CellStyle<TData = any> =
    | React.CSSProperties
    | ((context: CellContext<TData>) => React.CSSProperties | undefined)

// ============================================================================
// Context Types
// ============================================================================

export interface HeaderContext<TData = any> {
    column: Column<TData>
    table: Table<TData>
}

export interface CellContext<TData = any> {
    row: TData
    column: Column<TData>
    value: any
    table: Table<TData>
    rowIndex?: number
}

export interface FooterContext<TData = any> {
    column: Column<TData>
    table: Table<TData>
}

// ============================================================================
// Plugin Types
// ============================================================================

export interface Plugin {
    name: string
    hooks?: PluginHooks
    state?: Record<string, any>
    methods?: Record<string, Function>
}

export interface PluginHooks {
    onStateChange?: (state: TableState, table: Table) => void
    onInit?: (table: Table) => void
    onDestroy?: (table: Table) => void
}

// ============================================================================
// State Types
// ============================================================================

export interface TableState {
    sorting?: SortingState
    filtering?: FilteringState
    pagination?: PaginationState
    selection?: SelectionState
    columnOrder?: string[]
    columnVisibility?: Record<string, boolean>
    columnSizing?: Record<string, number>
    expanded?: Record<string, boolean>
    [key: string]: any
}

export interface SortingState {
    sortBy: Array<{ id: string; desc: boolean }>
}

export interface FilteringState {
    filters: Array<{ id: string; value: any }>
    globalFilter?: string
}

export interface PaginationState {
    pageIndex: number
    pageSize: number
}

export interface SelectionState {
    [rowId: string]: boolean
}

// ============================================================================
// Styling Types
// ============================================================================

export interface StyleRule<TData = any> {
    when: (row: TData, rowIndex: number) => boolean
    apply: {
        row?: React.CSSProperties
        cells?: Record<string, React.CSSProperties>
    }
}

export interface ThemeConfig {
    primaryColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    headerBackgroundColor?: string;
    textColor?: string;
    rowHoverColor?: string;
    fontSize?: string;
    fontFamily?: string;
    borderRadius?: string;
}
