import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTable, type Column } from 'ked-table-react'
import { Table } from 'ked-table-ui'

const meta: Meta<typeof Table> = {
  title: 'Features/Theming',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'Pending',
  },
]

const columns: Column<(typeof data)[0]>[] = [
  { id: 'id', accessorKey: 'id', header: 'ID', width: 60 },
  { id: 'name', accessorKey: 'name', header: 'Name', width: 200 },
  { id: 'role', accessorKey: 'role', header: 'Role' },
  { id: 'status', accessorKey: 'status', header: 'Status' },
]

export const CustomTheme: Story = {
  args: {
    theme: {
      primaryColor: '#00FF00',
      borderColor: '#ddd6fe',
      backgroundColor: '#f5f3ff',
      headerBackgroundColor: '#ede9fe',
      textColor: '#4c1d95',
      borderRadius: '12px',
      fontSize: '15px',
    },
  },
  render: args => {
    const table = useTable({ data, columns })
    return (
      <Table
        {...args}
        table={table}
        dividers={{ outer: true, rows: true, columns: true, header: true }}
      />
    )
  },
}

export const DarkTheme: Story = {
  args: {
    theme: {
      primaryColor: '#3b82f6',
      borderColor: '#334155',
      backgroundColor: '#0f172a',
      headerBackgroundColor: '#1e293b',
      textColor: '#f8fafc',
    },
  },
  render: args => {
    const table = useTable({ data, columns })
    return (
      <Table
        {...args}
        table={table}
        dividers={{ outer: true, rows: true, columns: true, header: true }}
      />
    )
  },
}
