
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { useSelection } from '@table-plugin/plugins'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Selection',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', status: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', status: 'Pending' },
    { id: 4, name: 'Alice Williams', status: 'Active' },
    { id: 5, name: 'Charlie Brown', status: 'Inactive' },
]

export const MultipleSelection: Story = {
    render: () => {
        const columns: Column<typeof data[0]>[] = [
            {
                id: 'select',
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getSelectedRows().length === data.length}
                        onChange={() => table.toggleAllRowsSelection()}
                    />
                ),
                cell: ({ row, table, rowIndex }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsRowSelected(String(rowIndex))}
                        onChange={() => table.toggleRowSelection(String(rowIndex))}
                    />
                ),
                width: 50,
                pinned: 'left'
            },
            { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
            { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
            { id: 'status', accessorKey: 'status', header: 'Status' },
        ]

        const table = useTable({
            data,
            columns,
            plugins: [useSelection()]
        })

        const selectedRows = table.getSelectedRows()

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <strong>Selected Rows:</strong> {selectedRows.length}
                    <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '8px', marginTop: '8px' }}>
                        {JSON.stringify(selectedRows, null, 2)}
                    </pre>
                </div>
                <Table table={table} />
            </div>
        )
    },
}

export const SingleSelection: Story = {
    render: () => {
        const columns: Column<typeof data[0]>[] = [
            {
                id: 'select',
                header: '',
                cell: ({ row, table, rowIndex }) => (
                    <input
                        type="radio"
                        checked={table.getIsRowSelected(String(rowIndex))}
                        onChange={() => table.toggleRowSelection(String(rowIndex))}
                    />
                ),
                width: 50,
            },
            { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
            { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
            { id: 'status', accessorKey: 'status', header: 'Status' },
        ]

        const table = useTable({
            data,
            columns,
            plugins: [useSelection({ enableMultiRowSelection: false })]
        })

        return <Table table={table} />
    },
}
