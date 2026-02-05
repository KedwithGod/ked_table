# ked-table-ui

Ready-to-use, beautiful, and accessible table components for the Table Plugin system.

## Installation

```bash
pnpm add ked-table-ui ked-table-react ked-table-core
```

## Usage

```tsx
import { useTable } from 'ked-table-react';
import { Table } from 'ked-table-ui';
import 'ked-table-ui/styles'; // Import default styles

function App() {
  const table = useTable({
    data,
    columns,
  });

  return <Table table={table} dividers={{ rows: true }} />;
}
```

## Features

- **Theming**: Fully themeable via the `ThemeConfig` object or CSS variables.
- **Sticky Headers/Columns**: Built-in support for sticky elements.
- **Responsive**: Mobile-friendly layout modes (Card View).
- **Interactive**: Hover effects, selection highlights, and more.

## Props

### `Table`

- `table`: The table instance from `useTable`.
- `dividers`: Object to configure border visibility (`rows`, `columns`, `outer`).
- `className`: Optional custom class name.
- `style`: Optional custom styles.
- `renderExpandedRow`: Function to render expanded content.

## License

MIT
