
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Dividers',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Configure table dividers and borders.',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof Table>

// Sample data
const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', age: 28 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', age: 34 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', age: 45 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'active', age: 29 },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', age: 52 },
]

const columns: Column<typeof sampleData[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'email', accessorKey: 'email', header: 'Email' },
    { id: 'status', accessorKey: 'status', header: 'Status' },
    { id: 'age', accessorKey: 'age', header: 'Age' },
]

/**
 * Table without any dividers for a cleaner look
 */
export const NoDividers: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: false, columns: false, header: false }}
            />
        )
    },
}

/**
 * Table with only row dividers
 */
export const RowDividersOnly: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: true, columns: false, header: true }}
            />
        )
    },
}

/**
 * Table with only column dividers
 */
export const ColumnDividersOnly: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: false, columns: true, header: true }}
            />
        )
    },
}

/**
 * Table with only header divider
 */
export const HeaderDividerOnly: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: false, columns: false, header: true }}
            />
        )
    },
}

/**
 * Table with only an outer border
 */
export const BorderOnly: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: false, columns: false, header: false, outer: true }}
            />
        )
    },
}

/**
 * Table with all dividers enabled (rows, columns, header, and outer border)
 */
export const AllDividers: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                dividers={{ rows: true, columns: true, header: true, outer: true }}
            />
        )
    },
}
