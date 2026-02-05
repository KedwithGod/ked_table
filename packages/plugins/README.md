# ked-table-plugins

The official plugin suite for @table-plugin.

## Installation

```bash
pnpm add ked-table-plugins
```

## Available Plugins

### `useSorting`
Enables column-based sorting.
- Multi-sort support.
- Custom sort functions.

### `useFiltering`
Enables column and global filtering.

### `usePagination`
Enables client-side pagination.

### `useSelection`
Enables row selection (single/multiple).

### `useReordering`
Enables **Column Reordering** via Drag-and-Drop or manual arrows.

### `useRowReordering`
Enables **Row Reordering** via Drag-and-Drop or manual arrows.

### `useResizing`
Enables column resizing.

### `useExpansion`
Enables row expansion for master-detail views.

### `useVisibility`
Enables toggling column visibility.

### `usePersistence`
Enables saving and restoring table state (ordering, visibility, sizing) to LocalStorage.

### `useExport`
Enables exporting table data to CSV/JSON.

## Usage Example

```tsx
import { 
  useSorting, 
  useReordering, 
  useRowReordering 
} from 'ked-table-plugins';

const table = useTable({
  data,
  columns,
  plugins: [
    useSorting(),
    useReordering(),
    useRowReordering(),
  ],
});
```

## License

MIT
