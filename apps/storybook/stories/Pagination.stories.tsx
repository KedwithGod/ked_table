
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { usePagination } from 'ked-table-plugins'
import { Table, Pagination } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
    title: 'Features/Pagination',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: i % 2 === 0 ? 'Admin' : 'User'
}))

const columns: Column<typeof data[0]>[] = [
    { id: 'id', accessorKey: 'id', header: 'ID' },
    { id: 'name', accessorKey: 'name', header: 'Name' },
    { id: 'role', accessorKey: 'role', header: 'Role' },
]

export const BasicPagination: Story = {
    render: () => {
        const table = useTable({
            data,
            columns,
            plugins: [usePagination({ pageSize: 10 })]
        })
        const pagination = table.getState().pagination || { pageIndex: 0, pageSize: 10 }

        return (
            <div>
                <Table table={table} />
                <Pagination
                    pageIndex={pagination.pageIndex}
                    pageSize={pagination.pageSize}
                    pageCount={table.getPageCount()}
                    canPreviousPage={table.canPreviousPage()}
                    canNextPage={table.canNextPage()}
                    onPageChange={table.setPageIndex}
                    onPageSizeChange={table.setPageSize}
                />
            </div>
        )
    },
}
