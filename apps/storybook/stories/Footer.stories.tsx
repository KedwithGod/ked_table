
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Footer',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', amount: 100, status: 'Active' },
    { id: 2, name: 'Jane Smith', amount: 250, status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', amount: 150, status: 'Pending' },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
    { id: 'name', accessorKey: 'name', header: 'Name', footer: 'Total' },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        footer: ({ table }) => {
            const total = table.getRows().reduce((acc: number, row: any) => acc + row.amount, 0)
            return `Sum: $${total}`
        }
    },
    { id: 'status', accessorKey: 'status', header: 'Status' },
]

export const BasicFooter: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return <Table table={table} dividers={{ outer: true }} />
    },
}

export const LoadingState: Story = {
    render: () => {
        const table = useTable({ data, columns })
        return <Table table={table} loading={true} dividers={{ outer: true }} />
    },
}
