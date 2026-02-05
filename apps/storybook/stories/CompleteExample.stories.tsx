import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { Table, Pagination } from 'ked-table-ui'
import { useSorting, useFiltering, usePagination } from 'ked-table-plugins'

const meta: Meta = {
    title: 'Features/Complete Example',
    tags: ['autodocs'],
}

export default meta

// Generate larger dataset
const generateData = (count: number) => {
    const statuses = ['active', 'inactive', 'pending']
    const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller']

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
        email: `user${i + 1}@example.com`,
        status: statuses[i % statuses.length],
        age: 20 + (i % 50),
    }))
}

const data = generateData(50)

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'email', accessorKey: 'email', header: 'Email' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
    { id: 'age', accessorKey: 'age', header: 'Age' },
]

/**
 * Complete example with sorting, filtering, and pagination
 */
export const WithAllPlugins: StoryObj = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [
                useSorting(),
                useFiltering(),
                usePagination({ pageSize: 10 }),
            ],
        })

        const paginationState = table.getState().pagination || { pageIndex: 0, pageSize: 10 }

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={e => table.setGlobalFilter(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            width: '300px',
                        }}
                    />
                </div>

                <Table table={table} stickyHeader />

                <Pagination
                    pageIndex={paginationState.pageIndex}
                    pageSize={paginationState.pageSize}
                    pageCount={table.getPageCount()}
                    canPreviousPage={table.canPreviousPage()}
                    canNextPage={table.canNextPage()}
                    onPageChange={index => table.setPageIndex(index)}
                    onPageSizeChange={size => table.setPageSize(size)}
                />
            </div>
        )
    },
}
