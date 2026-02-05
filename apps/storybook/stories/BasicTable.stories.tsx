import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Core/Basic Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The basic table component displays data in a tabular format with customizable columns and rows.',
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
 * Default table with all default settings
 */
export const Default: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return <Table table={table} />
    },
}

/**
 * Table with sticky header that stays visible when scrolling
 */
export const StickyHeader: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <div style={{ height: '300px', overflow: 'auto' }}>
                <Table table={table} stickyHeader />
            </div>
        )
    },
}


/**
 * Table with scrollable container
 */
export const Scrollable: Story = {
    render: () => {
        const table = useTable({ data: sampleData, columns })
        return (
            <Table
                table={table}
                stickyHeader
                layout={{ scroll: { y: 200 } }}
            />
        )
    },
}

/**
 * Empty table with no data
 */
export const Empty: Story = {
    render: () => {
        const table = useTable({ data: [], columns })
        return <Table table={table} />
    },
}
