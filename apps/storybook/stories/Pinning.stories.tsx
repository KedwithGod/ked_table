
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Pinning',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : 'User',
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    lastLogin: '2024-02-04',
    ipAddress: '192.168.1.1',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    actions: 'Edit/Delete'
}))

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', pinned: 'left', width: 60 },
    { id: 'name', accessorKey: 'name', header: 'Name', pinned: 'left', width: 150 },
    { id: 'email', accessorKey: 'email', header: 'Email', width: 250 },
    { id: 'role', accessorKey: 'role', header: 'Role', width: 120 },
    { id: 'status', accessorKey: 'status', header: 'Status', width: 120 },
    { id: 'lastLogin', accessorKey: 'lastLogin', header: 'Last Login', width: 150 },
    { id: 'ipAddress', accessorKey: 'ipAddress', header: 'IP Address', width: 150 },
    { id: 'bio', accessorKey: 'bio', header: 'Biography', width: 400 },
    { id: 'actions', accessorKey: 'actions', header: 'Actions', pinned: 'right', width: 120 },
]

/**
 * Table with multiple left-pinned and right-pinned columns
 */
export const StickyPinning: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return (
            <div style={{ width: '800px' }}>
                <Table
                    table={table}
                    layout={{ scroll: { x: 'auto' } }}
                    dividers={{ rows: true, columns: true, header: true, outer: true }}
                />
            </div>
        )
    },
}

/**
 * Pinning combined with sticky header
 */
export const PinningAndStickyHeader: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return (
            <div style={{ width: '800px' }}>
                <Table
                    table={table}
                    stickyHeader
                    layout={{ scroll: { x: 'auto', y: 400 } }}
                    dividers={{ rows: true, columns: true, header: true, outer: true }}
                />
            </div>
        )
    },
}
