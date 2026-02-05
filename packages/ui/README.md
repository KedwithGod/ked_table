# @table-plugin/ui

Ready-to-use, beautiful, and accessible table components for the Table Plugin system.

## Installation

```bash
pnpm add @table-plugin/ui @table-plugin/react @table-plugin/core
```

## Usage

```tsx
import { useTable } from '@table-plugin/react';
import { Table } from '@table-plugin/ui';
import '@table-plugin/ui/styles'; // Import default styles

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
