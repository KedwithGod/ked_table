
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { usePersistence, useSorting, useVisibility } from 'ked-table-plugins'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Persistence',
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
    { id: 'id', accessorKey: 'id', header: 'ID', width: 60, sortable: true },
    { id: 'name', accessorKey: 'name', header: 'Name', width: 200, sortable: true },
    { id: 'role', accessorKey: 'role', header: 'Role', sortable: true },
]

export const LocalStoragePersistence: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [
                useSorting(),
                useVisibility(),
                usePersistence({ id: 'my-demo-table' })
            ]
        })

        return (
            <div>
                <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                    Try sorting a column or hiding one, then refresh the page. Your state will be saved in localStorage.
                </p>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => table.toggleColumnVisibility('role')}>
                        Toggle Role Privacy
                    </button>
                    <button onClick={() => table.clearSavedState()}>
                        Clear Saved State
                    </button>
                </div>
                <Table table={table} dividers={{ outer: true }} />
            </div>
        )
    },
}
