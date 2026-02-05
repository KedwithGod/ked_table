
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { useVisibility } from 'ked-table-plugins'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Visibility',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
    { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
    { id: 'email', accessorKey: 'email', header: 'Email' },
    { id: 'role', accessorKey: 'role', header: 'Role' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
]

export const ColumnToggle: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [useVisibility()]
        })

        return (
            <div>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {table.getColumns().map(col => (
                        <label key={col.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={table.getIsColumnVisible(col.id)}
                                onChange={() => table.toggleColumnVisibility(col.id)}
                            />
                            {typeof col.header === 'string' ? col.header : col.id}
                        </label>
                    ))}
                </div>
                <Table table={table} />
            </div>
        )
    },
}
