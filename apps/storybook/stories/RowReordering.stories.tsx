import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'
import { useRowReordering } from '@table-plugin/plugins'

const meta: Meta = {
    title: 'Features/Row Reordering',
    tags: ['autodocs'],
}

export default meta

const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Editor' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'active', role: 'User' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', role: 'Admin' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', width: 80 },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'role', accessorKey: 'role', header: 'Role' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
]

export const BasicRowReordering: StoryObj = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [
                useRowReordering(),
            ],
        })

        return (
            <div>
                <div style={{ marginBottom: '16px', color: '#666' }}>
                    Use the <b>↑/↓ arrows</b> in the first column to move rows, or the <b>drag handle (⋮⋮)</b> to drag and drop.
                </div>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => table.sortOrder(false)}>Sort Order Asc</button>
                    <button onClick={() => table.sortOrder(true)}>Sort Order Desc</button>
                </div>
                <Table table={table} dividers={{ rows: true, outer: true }} />
            </div>
        )
    },
}
