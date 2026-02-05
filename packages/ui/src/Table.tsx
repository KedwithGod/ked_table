import React from 'react'
import { Table as TableType, resolveCellStyle, resolveRowStyle, resolveCellTextStyle, ThemeConfig } from '@table-plugin/core'
import './Table.css'

export interface TableProps<TData = any> {
    table: TableType<TData>
    className?: string
    stickyHeader?: boolean
    dividers?: {
        rows?: boolean
        columns?: boolean
        header?: boolean
        outer?: boolean
    }
    layout?: {
        scroll?: {
            x?: number | 'auto'
            y?: number | 'auto'
        }
    }
    renderExpandedRow?: (row: TData, rowIndex: number) => React.ReactNode
    layoutMode?: 'table' | 'card'
    theme?: ThemeConfig
    loading?: boolean
    loadingComponent?: React.ReactNode
    dir?: 'ltr' | 'rtl'
}

/**
 * Basic table component with styling support
 */
export function Table<TData = any>({
    table,
    className = '',
    stickyHeader = false,
    dividers = { rows: true, columns: true, header: true, outer: false },
    layout,
    renderExpandedRow,
    layoutMode = 'table',
    theme,
    loading = false,
    loadingComponent,
    dir = 'ltr',
}: TableProps<TData>) {
    const columns = table.getVisibleColumns()
    const rows = table.getRows()
    const styleRules = table.options.styleRules
    const [scrollState, setScrollState] = React.useState({ left: 0, right: 0 })
    const [dragOverId, setDragOverId] = React.useState<string | null>(null)
    const [dragOverRowId, setDragOverRowId] = React.useState<number | null>(null)
    const [isRowDragging, setIsRowDragging] = React.useState(false)

    const hasFooter = columns.some(c => c.footer)

    // Helper to get column width (including resizing)
    const getColWidth = (colId: string) => {
        const resizingState = table.getState() as any
        return resizingState.resizing?.columnWidths?.[colId] ||
            columns.find(c => c.id === colId)?.width || 150
    }

    // Calculate sticky offsets
    const leftPinnedCols = columns.filter(c => c.pinned === 'left')
    const rightPinnedCols = columns.filter(c => c.pinned === 'right').reverse()

    const leftOffsets: Record<string, number> = {}
    let currentLeft = 0
    leftPinnedCols.forEach(col => {
        leftOffsets[col.id] = currentLeft
        currentLeft += getColWidth(col.id)
    })

    const rightOffsets: Record<string, number> = {}
    let currentRight = 0
    rightPinnedCols.forEach(col => {
        rightOffsets[col.id] = currentRight
        currentRight += getColWidth(col.id)
    })

    const themeStyle: Record<string, string> = {}
    if (theme) {
        if (theme.primaryColor) themeStyle['--primary-color'] = theme.primaryColor
        if (theme.borderColor) themeStyle['--divider-color'] = theme.borderColor
        if (theme.backgroundColor) themeStyle['--table-bg'] = theme.backgroundColor
        if (theme.headerBackgroundColor) themeStyle['--header-bg'] = theme.headerBackgroundColor
        if (theme.textColor) themeStyle['--text-main'] = theme.textColor
        if (theme.fontSize) themeStyle['--font-size'] = theme.fontSize
        if (theme.borderRadius) themeStyle['--border-radius'] = theme.borderRadius
    }

    const containerStyle: React.CSSProperties = { ...themeStyle as any }
    if (layout?.scroll) {
        if (layout.scroll.x) {
            containerStyle.overflowX = layout.scroll.x === 'auto' ? 'auto' : 'scroll'
        }
        if (layout.scroll.y) {
            containerStyle.maxHeight =
                layout.scroll.y === 'auto' ? 'auto' : `${layout.scroll.y}px`
            containerStyle.overflowY = 'auto'
        }
    }

    // Handle scroll for shadows
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        setScrollState({
            left: target.scrollLeft,
            right: target.scrollWidth - target.clientWidth - target.scrollLeft
        })
    }

    const scrollClassName = [
        scrollState.left > 0 ? 'scrolling-left' : '',
        scrollState.right > 1 ? 'scrolling-right' : ''
    ].join(' ').trim()

    return (
        <div
            className={`table-container ${dividers.outer ? 'table-bordered' : ''} ${scrollClassName} ${className}`}
            style={containerStyle}
            onScroll={handleScroll}
            dir={dir}
        >
            {loading && (
                <div className="table-loading-overlay">
                    {loadingComponent || <div className="table-spinner">Loading...</div>}
                </div>
            )}
            <table className={`table ${layoutMode === 'card' ? 'layout-card' : ''}`}>
                <thead className={stickyHeader ? 'sticky' : ''}>
                    <tr className={dividers.header ? 'with-divider' : ''}>
                        {columns.map((column, index) => {
                            const width = getColWidth(column.id)

                            const isPinnedLeft = column.pinned === 'left'
                            const isPinnedRight = column.pinned === 'right'

                            const pinnedStyle: React.CSSProperties = {}
                            if (isPinnedLeft) pinnedStyle.left = leftOffsets[column.id]
                            if (isPinnedRight) pinnedStyle.right = rightOffsets[column.id]

                            return (
                                <th
                                    key={column.id}
                                    className={`${isPinnedLeft ? 'sticky-left' : isPinnedRight ? 'sticky-right' : ''} ${dragOverId === column.id ? 'drag-over' : ''}`}
                                    style={{
                                        ...column.style,
                                        ...pinnedStyle,
                                        width: `${width}px`,
                                        position: (isPinnedLeft || isPinnedRight) ? 'sticky' : 'relative',
                                        cursor: (column.sortable) ? 'pointer' : (table.options.plugins?.some(p => p.name === 'reordering') ? 'default' : undefined)
                                    }}
                                    onClick={() => {
                                        if (column.sortable && table.toggleSort) {
                                            table.toggleSort(column.id)
                                        }
                                    }}
                                    draggable={table.options.plugins?.some(p => p.name === 'reordering')}
                                    onDragStart={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'reordering')) {
                                            e.dataTransfer.setData('text/plain', String(index))
                                            e.dataTransfer.effectAllowed = 'move'
                                        }
                                    }}
                                    onDragOver={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'reordering')) {
                                            e.preventDefault()
                                            e.dataTransfer.dropEffect = 'move'
                                        }
                                    }}
                                    onDragEnter={() => {
                                        if (table.options.plugins?.some(p => p.name === 'reordering')) {
                                            setDragOverId(column.id)
                                        }
                                    }}
                                    onDragLeave={() => {
                                        setDragOverId(null)
                                    }}
                                    onDrop={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'reordering')) {
                                            e.preventDefault()
                                            const dragIndex = Number(e.dataTransfer.getData('text/plain'))
                                            const hoverIndex = index
                                            setDragOverId(null)

                                            if (dragIndex !== hoverIndex) {
                                                if (table.moveColumn) {
                                                    table.moveColumn(dragIndex, hoverIndex)
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <div className="th-content">
                                        {table.options.plugins?.some(p => p.name === 'reordering') && (
                                            <div className="reorder-controls">
                                                <button
                                                    className="reorder-arrow"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        table.moveColumnRelative(index, -1)
                                                    }}
                                                    title="Move left"
                                                >
                                                    ←
                                                </button>
                                                <span className="drag-handle" title="Drag to reorder">⋮⋮</span>
                                                <button
                                                    className="reorder-arrow"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        table.moveColumnRelative(index, 1)
                                                    }}
                                                    title="Move right"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        )}
                                        <div className="th-label">
                                            {typeof column.header === 'function'
                                                ? column.header({ column, table })
                                                : column.header}
                                        </div>
                                        {(() => {
                                            const sort = table.getState().sorting?.sortBy.find((s: any) => s.id === column.id)
                                            return sort ? (
                                                <span className="sort-indicator">
                                                    {sort.desc ? ' ↓' : ' ↑'}
                                                </span>
                                            ) : null
                                        })()}
                                    </div>
                                    {table.options.plugins?.some(p => p.name === 'resizing') && (
                                        <div
                                            className="resizer"
                                            onMouseDown={(e) => {
                                                e.stopPropagation() // Prevent drag start when resizing
                                                e.preventDefault()
                                                const startX = e.pageX
                                                const startWidth = width || (e.currentTarget.parentElement?.getBoundingClientRect().width || 100)

                                                const onMouseMove = (e: MouseEvent) => {
                                                    const plugin = table.options.plugins?.find(p => p.name === 'resizing')
                                                    if (plugin?.methods?.setColumnWidth) {
                                                        const newWidth = startWidth + (e.pageX - startX)
                                                        plugin.methods.setColumnWidth(column.id, newWidth)(table)
                                                    }
                                                }

                                                const onMouseUp = () => {
                                                    document.removeEventListener('mousemove', onMouseMove)
                                                    document.removeEventListener('mouseup', onMouseUp)
                                                }

                                                document.addEventListener('mousemove', onMouseMove)
                                                document.addEventListener('mouseup', onMouseUp)
                                            }}
                                        />
                                    )}
                                </th>
                            )

                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => {
                        const rowStyle = resolveRowStyle(row, rowIndex, styleRules)
                        const isExpanded = table.getIsRowExpanded?.(String(rowIndex))

                        return (
                            <React.Fragment key={rowIndex}>
                                <tr
                                    className={`${dividers.rows ? 'with-divider' : ''} ${table.getIsRowSelected?.(String(rowIndex)) ? 'selected-row' : ''} ${dragOverRowId === rowIndex ? 'row-drag-over' : ''} ${isRowDragging ? 'is-row-dragging' : ''}`}
                                    style={rowStyle}
                                    draggable={table.options.plugins?.some(p => p.name === 'rowReordering')}
                                    onDragStart={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'rowReordering')) {
                                            e.dataTransfer.setData('row-index', String(rowIndex))
                                            e.dataTransfer.effectAllowed = 'move'
                                            setIsRowDragging(true)

                                            // Set drag image if possible or just use default
                                            const target = e.currentTarget as HTMLElement
                                            target.classList.add('row-being-dragged')
                                        }
                                    }}
                                    onDragEnd={() => {
                                        setIsRowDragging(false)
                                        setDragOverRowId(null)
                                    }}
                                    onDragOver={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'rowReordering')) {
                                            e.preventDefault()
                                            e.dataTransfer.dropEffect = 'move'
                                        }
                                    }}
                                    onDragEnter={() => {
                                        if (table.options.plugins?.some(p => p.name === 'rowReordering')) {
                                            setDragOverRowId(rowIndex)
                                        }
                                    }}
                                    onDrop={(e) => {
                                        if (table.options.plugins?.some(p => p.name === 'rowReordering')) {
                                            e.preventDefault()
                                            const fromIndex = Number(e.dataTransfer.getData('row-index'))
                                            const toIndex = rowIndex
                                            setDragOverRowId(null)
                                            setIsRowDragging(false)

                                            if (fromIndex !== toIndex && table.moveRow) {
                                                table.moveRow(fromIndex, toIndex)
                                            }
                                        }
                                    }}
                                >
                                    {columns.map(column => {
                                        const value = column.accessorFn
                                            ? column.accessorFn(row)
                                            : (row as any)[column.accessorKey as any]

                                        const cellContext = { row, column, value, table, rowIndex }
                                        const cellStyle = resolveCellStyle(cellContext, styleRules)
                                        const cellTextStyle = resolveCellTextStyle(cellContext)

                                        const isPinnedLeft = column.pinned === 'left'
                                        const isPinnedRight = column.pinned === 'right'

                                        const pinnedStyle: React.CSSProperties = {}
                                        if (isPinnedLeft) pinnedStyle.left = leftOffsets[column.id]
                                        if (isPinnedRight) pinnedStyle.right = rightOffsets[column.id]

                                        return (
                                            <td
                                                key={column.id}
                                                className={`${dividers.columns ? 'with-divider' : ''} ${isPinnedLeft ? 'sticky-left' : isPinnedRight ? 'sticky-right' : ''}`}
                                                style={{
                                                    ...cellStyle,
                                                    ...pinnedStyle,
                                                    position: (isPinnedLeft || isPinnedRight) ? 'sticky' : undefined
                                                }}
                                            >
                                                <span className="cell-label">
                                                    {typeof column.header === 'function' ? column.id : column.header}
                                                </span>
                                                <span style={cellTextStyle}>
                                                    {column.cell
                                                        ? column.cell(cellContext)
                                                        : value != null
                                                            ? String(value)
                                                            : ''}
                                                </span>
                                                {table.options.plugins?.some(p => p.name === 'rowReordering') && columns.indexOf(column) === 0 && (
                                                    <div className="row-reorder-cell">
                                                        <button
                                                            className="row-reorder-arrow"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                table.moveRowRelative?.(rowIndex, -1)
                                                            }}
                                                            title="Move up"
                                                        >
                                                            ↑
                                                        </button>
                                                        <span className="drag-handle" title="Drag to reorder row">⋮⋮</span>
                                                        <button
                                                            className="row-reorder-arrow"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                table.moveRowRelative?.(rowIndex, 1)
                                                            }}
                                                            title="Move down"
                                                        >
                                                            ↓
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {isExpanded && renderExpandedRow && (
                                    <tr className="expanded-row">
                                        <td colSpan={columns.length} style={{ padding: '0px' }}>
                                            {renderExpandedRow(row, rowIndex)}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        )
                    })}
                </tbody>
                {hasFooter && (
                    <tfoot>
                        <tr>
                            {columns.map(column => {
                                const isPinnedLeft = column.pinned === 'left'
                                const isPinnedRight = column.pinned === 'right'

                                const pinnedStyle: React.CSSProperties = {}
                                if (isPinnedLeft) pinnedStyle.left = leftOffsets[column.id]
                                if (isPinnedRight) pinnedStyle.right = rightOffsets[column.id]

                                return (
                                    <td
                                        key={column.id}
                                        className={`${dividers.columns ? 'with-divider' : ''} ${isPinnedLeft ? 'sticky-left' : isPinnedRight ? 'sticky-right' : ''}`}
                                        style={{
                                            ...column.style,
                                            ...pinnedStyle,
                                            position: (isPinnedLeft || isPinnedRight) ? 'sticky' : undefined
                                        }}
                                    >
                                        {column.footer && (
                                            typeof column.footer === 'function'
                                                ? column.footer({ column, table })
                                                : column.footer
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    </tfoot>
                )}
            </table>
            {rows.length === 0 && (
                <div className="table-empty-state">
                    <p>No data available</p>
                </div>
            )}
        </div>
    )
}
