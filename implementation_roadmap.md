# Implementation Roadmap

This document outlines the implementation plan for the `tables_all` project, synthesized from various idea files. The goal is to build a high-performance, headless-first, and highly composable React table library with a robust plugin system.

## 1. Core Architecture & Philosophy
*   **Headless-First**: Logic and state management are separated from UI.
*   **Composable**: Features are opt-in via plugins (hooks).
*   **Framework-Friendly**: Primarily React for now, but architected to be framework-agnostic where possible.
*   **Data-Driven**: centralized layout and style control.

## 2. Core Features (Phase 1)
These are the essential features required for a functional data table.

- [x] **Basic Table Structure**: `useTable` hook, basic rendering.
- [x] **Data Binding**: Support for array data.
- [x] **Column Definitions**: `accessorKey`, `header`, `cell` rendering.
- [x] **Sorting**: Multi-column sorting, asc/desc support.
    - *Refinement needed*: Custom sort functions, server-side sorting hooks.
- [x] **Filtering**: Basic filtering.
    - *To Do*: Global search, column-specific filters (text, dropdown, date), custom filter logic.
- [x] **Pagination**: Basic pagination.
    - *To Do*: Server-side pagination support, page size customization.
- [x] **Column Resizing**: Drag-to-resize.
    - *To Do*: Double-click auto-fit, min/max width constraints.
- [x] **Column Reordering**: Drag-and-drop column reordering.
    - *To Do*: Accessibility support for reordering.

## 3. Visual & Layout Control (Phase 2)
Focus on the "Visual & Layout Control" layer defined in `ideas.md`.

- [x] **Divider & Border Control**:
    - [x] Global divider control (`rows`, `columns`, `header`, `outer`).
    - [x] Per-area styling overrides (e.g., `headerStyle`, `rowStyle`).
- [x] **Row & Cell Coloring**:
    - [x] Rule-based coloring (e.g., `rowStyle: (row) => ...`).
    - [x] Conditional cell styling (`cellStyle`, `cellTextStyle`).
    - [x] Status highlighting, zebra striping.
- [x] **Fixed Elements**:
    - [x] Sticky Headers.
    - [x] Sticky/Pinned Columns (Left/Right pinning).
    - [x] Shadow indicators for scrolling.
- [x] **Layout Modes**:
    - [x] Grid layout.
    - [x] Card layout (mobile friendly).

## 4. Advanced Features (Phase 3)
Power-user features for complex applications.

- [x] **Row Selection**:
    - [x] Single/Multi-row selection.
    - [x] Checkbox support, "Select All".
    - [ ] Shift+Click range selection.
- [x] **Row Expansion**:
    - [x] Accordion-style expansion for details or nested tables.
- [ ] **Editable Data**:
    - Inline cell editing.
    - Validation rules.
    - Edit callbacks (onSave).
- [ ] **Virtualization**:
    - Virtual scrolling for rows (handle 10k+ rows).
    - Virtualization for columns (handle 100+ columns).
- [x] **Column Visibility**:
    - [x] Method to show/hide columns dynamically.
    - [x] Column visibility menu/toolbar (demonstrated in stories).

## 5. Ecosystem & UX (Phase 4)
- [ ] **Theming System**:
    - [x] CSS variables foundation.
    - [ ] Dark/Light mode support (built foundation).
    - [x] Theme configuration API.
- [ ] **Accessibility (A11y)**:
    - ARIA roles.
    - Full keyboard navigation.
    - Screen reader testing.
- [ ] **Persistence**:
    - Save state (sort, filter, column order) to `localStorage` or URL.
- [ ] **Exporting**:
    - CSV/Excel export.

## 6. Development & Quality
- [ ] **Testing**: Unit tests for core logic, component tests for UI.
- [ ] **Documentation**: API docs, interactive examples.
- [ ] **Performance**: Memoization checks, render cycle optimizations.
