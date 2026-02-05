
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { useExport } from 'ked-table-plugins'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Export',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', role: 'Admin', balance: 1000 },
    { id: 2, name: 'Jane Smith', role: 'User', balance: 2500 },
    { id: 3, name: 'Bob Johnson', role: 'Editor', balance: 1500 },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
    { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
    { id: 'role', accessorKey: 'role', header: 'Role' },
    { id: 'balance', accessorKey: 'balance', header: 'Balance' },
]

export const CSVExport: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [useExport()]
        })

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <button
                        onClick={() => table.exportToCSV('my-table-data.csv')}
                        style={{
                            padding: '8px 16px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Export to CSV
                    </button>
                </div>
                <Table table={table} dividers={{ outer: true }} />
            </div>
        )
    },
}
