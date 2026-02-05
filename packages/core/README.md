# ked-table-core

The headless core logic for the Table Plugin system. This package is framework-agnostic and handles the internal state coordination and plugin orchestration.

## Installation

```bash
pnpm add ked-table-core
```

## Usage

```typescript
import { createTable } from 'ked-table-core';

const table = createTable({
  data: [...],
  columns: [...],
  plugins: [...],
});

const rows = table.getRows();
```

## API

### `createTable(options)`

Initializes a table instance.

#### Options

- `data`: Array of data objects.
- `columns`: Array of column definitions.
- `plugins`: Array of plugins to use.
- `state`: Initial state override.
- `onStateChange`: Callback for state updates.

### Table Instance Methods

- `getState()`: Returns current table state.
- `setState(updater)`: Updates table state.
- `getRows()`: Returns processed rows (after plugin transformations).
- `getColumns()`: Returns column definitions.
- `getVisibleColumns()`: Returns columns after visibility/order transformations.
- `reset()`: Resets state to initial values.

## License

MIT
