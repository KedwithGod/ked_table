
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/LayoutModes',
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
    { id: 'role', accessorKey: 'role', header: 'Role' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
]

/**
 * Default Table Layout
 */
export const TableLayout: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return <Table table={table} layoutMode="table" />
    },
}

/**
 * Card Layout (Mobile Friendly)
 */
export const CardLayout: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return (
            <div style={{ maxWidth: '400px' }}>
                <Table table={table} layoutMode="card" />
            </div>
        )
    },
}
