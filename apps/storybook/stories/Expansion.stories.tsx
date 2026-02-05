
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { useExpansion } from 'ked-table-plugins'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Expansion',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', role: 'Admin', details: 'Full access to system settings and user management.' },
    { id: 2, name: 'Jane Smith', role: 'User', details: 'Standard user access to project boards and reports.' },
    { id: 3, name: 'Bob Johnson', role: 'Editor', details: 'Can edit content but cannot manage users or settings.' },
]

export const RowDetails: Story = {
    render: () => {
        const columns: Column<typeof data[0]>[] = [
            {
                id: 'expander',
                header: '',
                cell: ({ table, rowIndex }) => (
                    <button
                        onClick={() => table.toggleRowExpanded(String(rowIndex))}
                        style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                    >
                        {table.getIsRowExpanded(String(rowIndex)) ? '👇' : '👉'}
                    </button>
                ),
                width: 50,
            },
            { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
            { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
            { id: 'role', accessorKey: 'role', header: 'Role' },
        ]

        const table = useTable({
            data,
            columns,
            plugins: [useExpansion()]
        })

        return (
            <Table
                table={table}
                renderExpandedRow={(row) => (
                    <div style={{ padding: '16px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                        <strong>Details for {row.name}:</strong>
                        <p style={{ margin: '8px 0 0' }}>{row.details}</p>
                    </div>
                )}
            />
        )
    },
}

export const SingleRowExpansion: Story = {
    render: () => {
        const columns: Column<typeof data[0]>[] = [
            {
                id: 'expander',
                header: '',
                cell: ({ table, rowIndex }) => (
                    <button
                        onClick={() => table.toggleRowExpanded(String(rowIndex))}
                        style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                    >
                        {table.getIsRowExpanded(String(rowIndex)) ? '👇' : '👉'}
                    </button>
                ),
                width: 50,
            },
            { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
            { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
            { id: 'role', accessorKey: 'role', header: 'Role' },
        ]

        const table = useTable({
            data,
            columns,
            plugins: [useExpansion({ enableMultiRowExpansion: false })]
        })

        return (
            <Table
                table={table}
                renderExpandedRow={(row) => (
                    <div style={{ padding: '16px', background: '#f5f3ff', borderBottom: '1px solid #ddd6fe' }}>
                        <pre>{JSON.stringify(row, null, 2)}</pre>
                    </div>
                )}
            />
        )
    },
}
