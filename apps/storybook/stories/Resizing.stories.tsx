import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'
import { useResizing } from '@table-plugin/plugins'

const meta: Meta = {
    title: 'Features/Column Resizing',
    tags: ['autodocs'],
}

export default meta

const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Editor' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'email', accessorKey: 'email', header: 'Email' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
    { id: 'role', accessorKey: 'role', header: 'Role' },
]

export const ResizableColumns: StoryObj = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [
                useResizing({
                    defaultWidth: 150,
                    minWidth: 50,
                }),
            ],
        })

        return (
            <div>
                <div style={{ marginBottom: '16px', color: '#666' }}>
                    Hover over the right edge of any column header to resize.
                </div>
                <Table table={table} />
            </div>
        )
    },
}
