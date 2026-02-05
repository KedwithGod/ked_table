# Table Plugin

A high-performance, headless table library for React, designed for enterprise-grade applications.

## Packages

- **[ked-table-core](./packages/core)**: The headless core logic. Framework agnostic.
- **[ked-table-react](./packages/react)**: React bindings and hooks.
- **[ked-table-ui](./packages/ui)**: Ready-to-use, beautiful, and accessible table components.
- **[ked-table-plugins](./packages/plugins)**: A suite of official plugins (Sorting, Filtering, Pagination, Reordering, etc.).

## Key Features

- 🚀 **Performant**: Optimized for large datasets with minimal re-renders.
- 🧩 **Extensible**: Plugin-based architecture. Build your own or use official ones.
- 🎨 **Beautiful UI**: Modern, responsive, and themeable UI components out of the box.
- 🛠️ **Headless**: Use our UI or build your own with our hooks.
- 🛡️ **Type-safe**: Built with TypeScript from the ground up.

## Installation

```bash
pnpm add ked-table-react ked-table-core ked-table-ui ked-table-plugins
```

## Quick Start

```tsx
import { useTable } from 'ked-table-react';
import { Table } from 'ked-table-ui';
import { useSorting, useFiltering } from 'ked-table-plugins';

const data = [...];
const columns = [...];

function App() {
  const table = useTable({
    data,
    columns,
    plugins: [useSorting(), useFiltering()],
  });

  return <Table table={table} />;
}
```

## Documentation

For detailed guides and API references, check the individual package READMEs.

## License

MIT
