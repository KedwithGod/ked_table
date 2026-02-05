
import { createPlugin } from '@table-plugin/core'

/**
 * Export plugin - adds CSV export capabilities
 */
export function useExport() {
    return createPlugin({
        name: 'export',
        methods: {
            exportToCSV: (filename: string = 'table-export.csv') => (table: any) => {
                const columns = table.getVisibleColumns()
                const rows = table.getRows()

                // Header
                const headers = columns.map((col: any) =>
                    typeof col.header === 'string' ? col.header : col.id
                ).join(',')

                // Data
                const csvRows = rows.map((row: any) => {
                    return columns.map((col: any) => {
                        const value = col.accessorFn
                            ? col.accessorFn(row)
                            : (row as any)[col.accessorKey as any]

                        // Basic CSV escaping
                        let cellValue = value == null ? '' : String(value)
                        if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
                            cellValue = `"${cellValue.replace(/"/g, '""')}"`
                        }
                        return cellValue
                    }).join(',')
                })

                const csvContent = [headers, ...csvRows].join('\n')
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const url = URL.createObjectURL(blob)

                const link = document.createElement('a')
                link.setAttribute('href', url)
                link.setAttribute('download', filename)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    })
}
