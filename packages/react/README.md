# ked-table-react

React hooks and bindings for the Table Plugin system.

## Installation

```bash
pnpm add ked-table-react ked-table-core
```

## Usage

```tsx
import { useTable } from 'ked-table-react';

function MyTable() {
  const table = useTable({
    data: [...],
    columns: [...],
  });

  return (
    <table>
      <thead>
        {table.getColumns().map(col => (
          <th key={col.id}>{col.header}</th>
        ))}
      </thead>
      <tbody>
        {table.getRows().map((row, i) => (
          <tr key={i}>
            {table.getColumns().map(col => (
              <td key={col.id}>{row[col.accessorKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## API

### `useTable(options)`

A hook that creates and manages a table instance. It ensures the table state is reactive within React.

## License

MIT
