
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Styling',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', balance: 150.50, role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', balance: -25.00, role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending', balance: 0.00, role: 'Editor' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'active', balance: 3000.00, role: 'Admin' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', balance: -100.00, role: 'User' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'email', accessorKey: 'email', header: 'Email' },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cellTextStyle: (ctx) => ({
            fontWeight: 600,
            color: ctx.value === 'active' ? '#10b981' : ctx.value === 'inactive' ? '#ef4444' : '#f59e0b'
        })
    },
    {
        id: 'balance',
        accessorKey: 'balance',
        header: 'Balance',
        cellStyle: (ctx) => ({
            backgroundColor: ctx.value < 0 ? '#fee2e2' : undefined,
            textAlign: 'right'
        }),
        cellTextStyle: (ctx) => ({
            color: ctx.value < 0 ? '#b91c1c' : '#047857'
        })
    },
    { id: 'role', accessorKey: 'role', header: 'Role' },
]

/**
 * Conditional styling using rule-based row styles
 */
export const ConditionalRowStyling: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            styleRules: [
                {
                    when: (row) => row.status === 'inactive',
                    apply: {
                        row: { backgroundColor: '#f9fafb', opacity: 0.7 }
                    }
                },
                {
                    when: (row) => row.role === 'Admin',
                    apply: {
                        row: { borderLeft: '4px solid #3b82f6' }
                    }
                }
            ]
        })
        return <Table table={table} />
    },
}

/**
 * Zebra striping using rules
 */
export const ZebraStriping: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            styleRules: [
                {
                    when: (_, index) => index % 2 === 0,
                    apply: {
                        row: { backgroundColor: '#f8fafc' }
                    }
                }
            ]
        })
        return <Table table={table} />
    },
}

/**
 * Highlighting specific cells based on rules
 */
export const HeatmapCells: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            styleRules: [
                {
                    when: (row) => row.balance > 1000,
                    apply: {
                        cells: {
                            balance: { backgroundColor: '#dcfce7', fontWeight: 'bold' }
                        }
                    }
                }
            ]
        })
        return <Table table={table} />
    },
}
