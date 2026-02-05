
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { useFiltering } from '@table-plugin/plugins'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Filtering',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Bob Johnson', role: 'Editor' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'role', accessorKey: 'role', header: 'Role' },
]

export const GlobalFiltering: Story = {
    render: () => {
        const table = useTable({ data, columns, plugins: [useFiltering()] })
        return (
            <div>
                <input
                    placeholder="Search..."
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                    style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ddd' }}
                />
                <Table table={table} />
            </div>
        )
    },
}
