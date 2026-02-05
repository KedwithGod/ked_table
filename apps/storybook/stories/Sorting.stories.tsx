
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from '@table-plugin/react'
import { useSorting } from '@table-plugin/plugins'
import { Table } from '@table-plugin/ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Sorting',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 },
]

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID', sortable: true },
    { id: 'name', accessorKey: 'name', header: 'Name', sortable: true },
    { id: 'age', accessorKey: 'age', header: 'Age', sortable: true },
]

export const BasicSorting: Story = {
    render: () => {
        const table = useTable({ data, columns, plugins: [useSorting()] })
        React.useEffect(() => {
            (window as any).table = table
        }, [table])
        return <Table table={table} />
    },
}
